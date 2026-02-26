const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

if (projectId) {
	fetch(`./content/${projectId}.md`)
		.then((response) => {
			if (!response.ok) throw new Error("File not found");
			return response.text();
		})
		.then((markdown) => {
			const contentDiv = document.getElementById("content");
			const markedContent = processMarkdown(markdown);
			contentDiv.innerHTML = marked.parse(markedContent[1]);

			document.title = markedContent[0].title + " - kitkatyj";

			const releasedDate = new Date(markedContent[0].released);
			const updatedDate = new Date(markedContent[0].written);
			$("#released-date > span").text(releasedDate.toLocaleDateString());
			$("#updated-date > span").text(updatedDate.toLocaleDateString());

			if (markedContent[0].type === "video") {
				const youtubeEmbed = $(`<iframe
								src="https://www.youtube.com/embed/${YouTubeGetID(markedContent[0].link)}"
								title="YouTube video player"
								frameborder="0" allow="accelerometer; autoplay;
								clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
								</iframe>`);

				$("header").prepend(youtubeEmbed);
			} else {
				const linkBtn = $(`<a
								class='link-btn'
								href='${markedContent[0].link}'
								>
								<i class="fas fa-rocket"></i> Open Project
								</a>`);
				$("header").prepend(linkBtn);
			}
		})
		.catch((err) => {
			if (err.message === "File not found") {
				document.getElementById("content").innerHTML = `
					           <h1>Project '${projectId}' Not Found</h1>
					           <a href="/">Return to Home</a>
					       `;
			} else {
				document.getElementById("content").innerHTML = `
					           <h1>Error</h1>
								<p>${err.message}</p>
					           <a href="/">Return to Home</a>
					       `;
			}
		});
} else {
	window.location.href = "/";
}

function processMarkdown(text) {
	const splitRegex = /^---([\s\S]*?)\n---([\s\S]*)/;
	const match = text.match(splitRegex);

	if (!match) return ["", text.trim()];

	let header = YAML.parse(match[1].trim());
	let content = match[2].trim();

	const linkRegex = /\[\[([^|]+)\|([^\]]+)\]\]/g;

	content = content.replace(linkRegex, "[$2](?id=$1)");

	return [header, content];
}

function YouTubeGetID(url) {
	var ID = "";
	url = url
		.replace(/(>|<)/gi, "")
		.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
	if (url[2] !== undefined) {
		ID = url[2].split(/[^0-9a-z_\-]/i);
		ID = ID[0];
	} else {
		ID = url;
	}
	return ID;
}

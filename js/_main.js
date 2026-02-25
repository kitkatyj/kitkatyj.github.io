var starlax;
let DATA = {};

function init() {
	console.log(
		'%c"Imagination will often carry us to worlds that never were. But without it we go nowhere." -Carl Sagan',
		"font-size:1.5em; font-style:italic; font-family:'Courier New',monospace; padding:0.5em 0; line-height:1.5;",
	);

	$(".js-msg").remove();

	starlax = new Starlax({
		zPos: 10,
		zPosRandom: 1,
		color: "#fff",
	});

	resizePlanet();
	window.addEventListener("resize", function (e) {
		resizePlanet();
	});
}

function resizePlanet() {
	$("footer").css(
		"height",
		window.innerWidth >= 767
			? window.innerWidth / 4
			: (window.innerWidth * 2) / 3,
	);
}

function scrollToSmooth(element, duration = 1000) {
	$("html, body").animate(
		{
			scrollTop: $("#" + element).offset().top - $("#nav").height(),
		},
		duration,
	);
}

function copyToClipboard(text) {
	if (window.clipboardData && window.clipboardData.setData) {
		return window.clipboardData.setData("Text", text);
	} else if (
		document.queryCommandSupported &&
		document.queryCommandSupported("copy")
	) {
		var textarea = document.createElement("textarea");
		textarea.textContent = text;
		textarea.style.position = "fixed";
		document.body.appendChild(textarea);
		textarea.select();
		try {
			return document.execCommand("copy");
		} catch (ex) {
			console.warn("Copy to clipboard failed.", ex);
			return prompt("Copy to clipboard: Ctrl+C, Enter", text);
		} finally {
			document.body.removeChild(textarea);
		}
	}
}

$(window).on("load", init);

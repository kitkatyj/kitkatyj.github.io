var starlax;
var resizeTimer;
var copyTimer;
var timer = 0;
let DATA = {};
let showAllValue = {};

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

	$.get("data/index.json", function (data) {
		DATA = data;
		Object.entries(DATA).forEach(([key, section]) => {
			$("#" + key).append($("<ul></ul>"));
			reloadSectionList(key);
		});
	}).done(function () {
		$("#nav").scrollspy({ offset: -$("#nav").height(), animate: true });
	});

	$("#nav li.hamburger").click(function () {
		$("#nav").toggleClass("closed");
	});
	$("#nav a[href]").click(function () {
		$("#nav").addClass("closed");
	});

	$("footer").html(
		"<p>Copyright &copy; kitkatyj " + new Date().getFullYear() + "</p>",
	);
}

function reloadSectionList(section, showAll = false) {
	$("#" + section + " > ul").empty();
	$("#" + section + " > a").remove();
	let sectionList = eval("DATA." + section);
	Object.entries(sectionList)
		.slice(0, showAll ? Object.entries(sectionList).length : 3)
		.forEach(function ([key, project]) {
			loadProject(project, section);
		});

	let toggleBtn = $(
		"<a class='bubble-btn'>" +
			(showAll
				? "Show less <i class='fas fa-chevron-up'>"
				: "Show all <i class='fas fa-chevron-down'>") +
			"</a>",
	).click(() => {
		reloadSectionList(section, !showAll);
		if (showAll) scrollToSmooth(section);
	});
	$("#" + section).append(toggleBtn);
}

function loadProject(project, section) {
	var sectionListElement = $("#" + section + " ul");

	var projectCard = $("<li></li>");
	var projectLink = $("<a></a>");

	if (project.preview && project.preview.length > 0) {
		var projectPreviewHold = $('<div class="preview-hold"></div>');
		projectLink.append(projectPreviewHold);

		var projectPreview =
			project.previewAlt && project.previewAlt.length > 0
				? $(
						'<img src="img/' +
							project.preview +
							'" alt="' +
							project.previewAlt +
							'">',
					)
				: $('<img src="img/' + project.preview + '">');
		projectPreviewHold.append(projectPreview);
	}

	var projectCaptionHold = $('<div class="caption-hold"></div>');
	projectLink.append(projectCaptionHold);

	if (project.icon && project.icon.length > 0) {
		var projectImgHold = $('<div class="icon-hold"></div>');
		projectCaptionHold.append(projectImgHold);

		var projectIcon =
			project.iconAlt && project.iconAlt.length > 0
				? $(
						'<img src="img/' +
							project.icon +
							'" alt="' +
							project.iconAlt +
							'">',
					)
				: $('<img src="img/' + project.icon + '">');
		projectImgHold.append(projectIcon);
	}

	var projectCaption = $('<div class="project-caption"></div>');

	var projectTitle = $("<h4>" + project.title + "</h4>");
	projectCaption.append(projectTitle);

	if (project.subtitle && project.subtitle.length > 0) {
		var projectSubtitle = $(
			'<span class="subtitle">' + project.subtitle + "</span>",
		);
		projectCaption.append(projectSubtitle);
	}

	if (project.description && project.description.length > 0) {
		var projectDescription = $(
			'<p class="description">' + project.description + "</p>",
		);
		projectCaption.append(projectDescription);
	}

	projectLink.attr({
		href: project.link,
		"data-type": project.type,
		target: "_blank",
	});

	projectCaptionHold.append(projectCaption);
	projectCard.append(projectLink);
	sectionListElement.append(projectCard);
}

function resizePlanet() {
	$("footer").css(
		"height",
		window.innerWidth >= 767
			? window.innerWidth / 8
			: (window.innerWidth * 2) / 3,
	);
}

function scrollToSmooth(element) {
	$("html, body").animate(
		{
			scrollTop: $("#" + element).offset().top - $("#nav").height(),
		},
		1000,
	);
}

function dorkAttack() {
	confirm(
		"Emergency Alert! Giant horse attack in your region. Please remain calm and prepare to meet your demise.",
	);
}

function copyEmail() {
	clearTimeout(copyTimer);
	copyToClipboard("info@kitkatyj.com");
	$("#email").text("Copied to clipboard!").parent().addClass("hold");

	copyTimer = setTimeout(function () {
		$("#email").text("info@kitkatyj.com").parent().removeClass("hold");
	}, 3000);
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

window.onload = init;

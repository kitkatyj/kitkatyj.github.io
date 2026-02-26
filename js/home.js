var copyTimer;

function init_index() {
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
			loadProject(key, project, section);
		});

	let toggleBtn = $(
		"<a class='bubble-btn'>" +
			(showAll
				? "Show less <i class='fas fa-chevron-up'>"
				: "Show all <i class='fas fa-chevron-down'>") +
			"</a>",
	).click(() => {
		reloadSectionList(section, !showAll);
		if (showAll) scrollToSmooth(section, 500);
	});
	$("#" + section).append(toggleBtn);
}

function loadProject(projectid, project, section) {
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
		href: "projects/?id=" + projectid,
		"data-type": project.type,
	});

	projectCaptionHold.append(projectCaption);
	projectCard.append(projectLink);
	sectionListElement.append(projectCard);
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

$(window).on("load", init_index);

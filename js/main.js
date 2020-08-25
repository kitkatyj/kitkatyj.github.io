var starlax;
var resizeTimer;
var timer = 0;

function init(){
    console.log('%c"Imagination will often carry us to worlds that never were. But without it we go nowhere." -Carl Sagan',"font-size:1.5em; font-style:italic; font-family:'Courier New',monospace; padding:0.5em 0; line-height:1.5;");

    $('#projects p').remove();

    starlax = new Starlax({
        zPos:10,
        zPosRandom:1,
        color:'#fff'
    });

    resizePlanet();
    window.addEventListener("resize",function(e){
        resizePlanet();
    });

    $.get("data/projects.json",function(data){
        $('#projects').append($('<ol></ol>'));
        data.projects.forEach(function(project){
            loadProject(project);
        });
    });

    $('header').append('<a id="scrollDown"><i class="fas fa-arrow-alt-circle-down"></i><p>&nbsp; Scroll to continue</p></a>');
    $('#scrollDown').css({opacity:0})
        .delay(2500).animate({opacity:0.5},function(){
            $(this).attr({
                href:"#downwego",
                onclick:"scrollToSmooth('projects')"
            });
        })
        .hover(function(){
            $(this).animate({opacity:1},200);
        },function(){
            $(this).animate({opacity:0.5},200);
        });
}

function loadProject(project){
    var yearStamp = $("#projects ol li:contains('"+project.year+"')");

    if(yearStamp.length === 0){
        yearStamp = $('<li><h3>'+project.year+'</h3><ul></ul></li>');
        $('#projects ol').append(yearStamp);
    }

    var projectCard = $('<li></li>');
    var projectLink = $('<a></a>');

    if(project.preview && project.preview.length > 0){
        var projectPreviewHold = $('<div class="preview-hold"></div>');
        projectLink.append(projectPreviewHold);

        var projectPreview = $('<img src="img/'+project.preview+'">');
        projectPreviewHold.append(projectPreview);
    }

    var projectCaptionHold = $('<div class="caption-hold"></div>');
    projectLink.append(projectCaptionHold);

    if(project.icon && project.icon.length > 0){
        var projectImgHold = $('<div class="icon-hold"></div>');
        projectCaptionHold.append(projectImgHold);

        var projectIcon = $('<img src="img/'+project.icon+'">');
        projectImgHold.append(projectIcon);
    }

    var projectCaption = $('<div class="project-caption"></div>');
    
    var projectTitle = $('<h4>'+project.title+'</h4>');
    projectCaption.append(projectTitle);

    if(project.subtitle && project.subtitle.length > 0){
        var projectSubtitle = $('<span class="subtitle">'+project.subtitle+'</span>');
        projectCaption.append(projectSubtitle);
    }

    if(project.description && project.description.length > 0){
        var projectDescription = $('<p class="description">'+project.description+'</p>');
        projectCaption.append(projectDescription);
    }

    projectLink.attr({
        'href':project.link,
        'data-type':project.type
    });

    projectCaptionHold.append(projectCaption);
    projectCard.append(projectLink);
    yearStamp.find('ul').append(projectCard);
}

function resizePlanet(){
    $('footer').css('height',(window.innerWidth >= 767) ? window.innerWidth / 8 : window.innerWidth * 2/3);
}

function scrollToSmooth(element){
    $('html, body').animate({
        scrollTop: $('#'+element).offset().top
    },1000);
}

window.onload = init;
var canvas, ctx;
var resizeTimer;
var starfield = [];
var timer = 0;

var ua = window.navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
var webkit = !!ua.match(/WebKit/i);
var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

function init(){
    console.log('%c"Imagination will often carry us to worlds that never were. But without it we go nowhere." -Carl Sagan',"font-size:1.5em; font-style:italic; font-family:'Courier New',monospace; padding:0.5em 0; line-height:1.5;");

    canvas = document.getElementById('stars-bg');
    ctx = canvas.getContext('2d');

    $('#projects p').remove();

    resizeReset();
    window.addEventListener("resize",function(e){
        if(!iOSSafari){
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeReset,250);
        }
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

    draw();
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

function resizeReset(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setStarfield();
}

function setStarfield(){
    starfield = [];
    var qty = Math.floor(canvas.width/75 * canvas.height/75);

    for(i = 0; i < qty; i++){

        starfield.push({
            "twinkleOffset":Math.random() * 2 * Math.PI,
            "posX":Math.round(Math.random() * canvas.width),
            "posY":Math.round(Math.random() * canvas.height),
            "size":2+Math.floor(Math.random() * 3),
            "zIndex":2+Math.floor(10*Math.random())
        });
    }
    // console.log(starfield);
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#000033";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    starfield.forEach(function(star){
        ctx.beginPath();
        ctx.arc(
            star.posX,
            mod((star.posY - window.pageYOffset/star.zIndex),canvas.height),
            star.size,
            0,2*Math.PI
        );
        ctx.globalAlpha = (0.5 + 0.5 * Math.sin((timer + star.twinkleOffset*20)/20)) * ((12 - star.twinkleOffset)/12)*0.5;
        ctx.fillStyle = "white";
        ctx.fill();
    });

    timer++;
    window.requestAnimationFrame(draw);
}

function scrollToSmooth(element){
    $('html, body').animate({
        scrollTop: $('#'+element).offset().top
    },1000);
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

window.onload = init;
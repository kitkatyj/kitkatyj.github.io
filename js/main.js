var canvas, ctx;
var resizeTimer;
var starfield = [];
var timer = 0;

function init(){
    console.log('Ready!');

    canvas = document.getElementById('stars-bg');
    ctx = canvas.getContext('2d');

    resizeReset();
    window.addEventListener("resize",function(e){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeReset,250);
    });

    $('#scrollDown').css({opacity:0}).hide().delay(2000).show(1).animate({opacity:0.5});
    $('#scrollDown').hover(function(){
        $(this).animate({opacity:1},200);
    },function(){
        $(this).animate({opacity:0.5},200);
    });

    draw();
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

    starfield.forEach(function(star,index){
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

    // console.log(window.pageYOffset);

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
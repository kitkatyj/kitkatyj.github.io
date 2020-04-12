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

    draw();
}

function resizeReset(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setStarfield();
}

function setStarfield(){
    starfield = [];
    // var qty = 1;
    var qty = Math.floor(canvas.width/75 * canvas.height/75);

    // console.log("Total stars: "+ qty);
    for(i = 0; i < qty; i++){

        starfield.push({
            "twinkleOffset":Math.random() * 2 * Math.PI,
            "posX":Math.round(Math.random() * canvas.width),
            "posY":Math.round(Math.random() * canvas.height),
            "size":2+Math.floor(Math.random() * 3),
            "zIndex":2+Math.floor(10*Math.random())
        });
    }
    console.log(starfield);
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
        ctx.globalAlpha = (0.5 + 0.5 * Math.sin((timer + star.twinkleOffset*20)/20)) * ((12 - star.twinkleOffset)/12);
        // console.log(ctx.globalAlpha);
        ctx.fillStyle = "white";
        ctx.fill();
    });

    // console.log(window.pageYOffset);

    timer++;
    window.requestAnimationFrame(draw);
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

window.onload = init;
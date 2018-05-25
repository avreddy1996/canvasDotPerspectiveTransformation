var canvas = document.getElementById('dotsCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var dotsNum = 50;
var dots = [];
var width = canvas.width;
var height = canvas.height;
var bounce = -1;
var dotsDistance = 60;
for(var i=0;i<dotsNum;i++){
    dots.push({
        x:Math.random()*width,
        y:Math.random()*height,
        vx:Math.random()*0.8,
        vy:Math.random()*0.8,
        radius: Math.random()*2,
        color:'#fff'
    })
}
function draw() {
    ctx.clearRect(0,0,width,height);
    var dot,j;
    for(j=0;j<dotsNum;j++){
        dot = dots[j];
        ctx.beginPath();
        ctx.arc(dot.x,dot.y,dot.radius,0,2*Math.PI);
        ctx.fillOpacity = 0.8;
        ctx.fillStyle = dot.color;
        ctx.fill();
    }
    drawLines()
}
function drawLines() {
    var dot1,dot2;
    for(var i=0;i<dotsNum;i++){
        dot1 = dots[i];
        for(var j=0;j<dotsNum;j++){
            dot2 = dots[j];
            if(Math.abs(dot1.x - dot2.x)<dotsDistance && Math.abs(dot1.y - dot2.y)<dotsDistance){
                ctx.moveTo(dot1.x,dot1.y);
                ctx.lineWidth = 0.1;
                ctx.lineTo(dot2.x,dot2.y);
                ctx.strokeStyle = dot1.color;
                ctx.strokeOpacity = 0.6;
                ctx.stroke();
            }
        }
    }
}
function update(){
    for(var i=0;i<dotsNum;i++){
        dots[i].x += dots[i].vx;
        dots[i].y += dots[i].vy;
        if(dots[i].x>width || dots[i].x<0){
            dots[i].vx *= bounce;
        }
        if(dots[i].y>height || dots[i].y<0){
            dots[i].vy *= bounce;
        }
    }
}
setInterval(function () {
    draw();
    update();
}, 1000/60);
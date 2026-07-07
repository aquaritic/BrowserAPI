const canvas = document.getElementById("cursor");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

let stars = [];

document.addEventListener("mousemove", e => {
    stars.push({
        x: e.clientX,
        y: e.clientY,
        r: 2,
        a: 1
    });
});

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((s, i) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.a})`;

        s.a -= .02;
        s.y -= .02;

        if(s.a <= 0){
            stars.splice(i, 1);
        }
    });
    
    requestAnimationFrame(draw);
}

draw();
function setupCanvas(){
canvas = document.querySelector("canvas");
canvas.height = 500;
canvas.width = 500;
ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
}

function drawCircle(x, y, radius, fs, ss){
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = fs;
  ctx.fill();
  ctx.strokeStyle = ss;
  ctx.stroke();
}


// function Circle(x, y, dx, dy, radius) {
//   
//   this.x = x;
//   this.y = y;
//   this.dx = dx;
//   this.dy = dy;
//   this.radius = radius;

//   this.draw = function(){
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
//     ctx.fillStyle = "rgba(0, 186, 255, 0.5)";
//     ctx.fill();
//     ctx.strokeStyle = "blue";
//     ctx.stroke();
//   }

//   this.update = function(){
//      
//     if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {

//       this.dx = -this.dx
//     }
//     if(this.y + this.radius > canvas.height || this.y - this.radius < 0) {

//       this.dy = -this.dy
//     }

//     this.x += this.dx;
//     this.y += this.dy;


//     this.draw();

//   }
// }

// let circles = [];
// let radius = 18;

// for(let i=0; i<100; i++) {

//   let x = Math.random() * (canvas.width - radius * 2) + radius;
//   let y = Math.random() * (canvas.height - radius * 2) + radius;
//   let dx = 2 * (Math.random() - 0.5);
//   let dy = 2 * (Math.random() - 0.5);

//   circles.push(new Circle(x, y, dx, dy, radius));
// }

// function animate() {
//   
//   requestAnimationFrame(animate);
//   ctx.clearRect(0,0,canvas.width,canvas.height);
//   
//   for(let i=0; i<circles.length; i++) {
//     circles[i].update();
//   }

// }

// animate();

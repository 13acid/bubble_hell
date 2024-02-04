class Bubble {
  constructor(x, y, vx, vy, radius, fs, ss, hp){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.fs = fs;
    this.ss = ss;
    this.hp = hp;
  }

  draw(){
    drawCircle(this.x, this.y, this.radius, this.fs, this.ss)
  }
}

class Player extends Bubble{
  constructor(x, y){
    super(x, y, 0, 0, 10, "white", "black", 10);
    this.isPlayer = true;
  }

  update(){
    if(controls.keys[37]) {this.x = this.x - 1;} 
    if(controls.keys[39]) {this.x = this.x + 1;} 
    if(controls.keys[38]) {this.y = this.y - 1;} 
    if(controls.keys[40]) {this.y = this.y + 1;} 
  }

}

class StraightBubble extends Bubble{
  constructor(x, y){
    super(x, y, Math.random(1,4), Math.random(1,4), 25, "blue", "red", 1);
  }

  update(){
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {

      this.vx = -this.vx
    }
    if(this.y + this.radius > canvas.height || this.y - this.radius < 0) {

      this.vy = -this.vy
    }

    this.x += this.vx;
    this.y += this.vy;
  }
}

function checkCollision() {
  if (Math.sqrt(Math.pow(player.x - bubble.x,2) + Math.pow(player.y - bubble.y,2)) < (player.radius + bubble.radius)) {
    console.log("Collided");
    bubble.fs = "red";
  }
  else{
    bubble.fs = "blue";
  }
}


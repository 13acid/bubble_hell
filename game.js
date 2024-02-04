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
    if(controls.keys[37]) {this.x = this.x - 2;} 
    if(controls.keys[39]) {this.x = this.x + 2;} 
    if(controls.keys[38]) {this.y = this.y - 2;} 
    if(controls.keys[40]) {this.y = this.y + 2;} 
  }

  dead(){
    if (this.hp <= 0){
      this.fs = "red";
      return true;
    }else{
      return false;
    }
  }

}

class StraightBubble extends Bubble{
  constructor(x, y){
    super(x, y, Math.random(1,4), Math.random(1,4), Math.floor(5 + Math.random() * 35),  "rgba(51, 153, 255, 0.7)", "red", 1);
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
  for (i=0; i<bubbles.length; i++){
    if (Math.sqrt(Math.pow(player.x - bubbles[i].x,2) + Math.pow(player.y - bubbles[i].y,2)) < (player.radius + bubbles[i].radius)) {
      console.log("Collided");
      bubbles[i].fs = "red";
      bubbles[i].hp -= 1;
      return true;
    }
    else{
      bubbles[i].fs =  "rgba(51, 153, 255, 0.7)";
    }
  }
}

function playerHit(){
  if (checkCollision() == true){
    player.hp -= 1;
  }
}

function removeDeadBubbles() {
  for (i=0; i<bubbles.length; i++){
    if (bubbles[i].hp <= 0){
      bubbles.splice(i,1);
    }
  }
}

function spawnBubbles(){

  for(i=0;i<50;i++){
    let x = Math.floor(Math.random() * (canvas.width - 75 * 2) + 75);
    let y = Math.floor(Math.random() * (canvas.height - 75 * 2) + 75);

    bubbles.push(new StraightBubble(x, y))
  }
}

function updatePositions(){

  for(i=0; i<bubbles.length; i++){
    bubbles[i].update();
  }

  player.update();
}

function drawBubbles(){

  for(i=0; i<bubbles.length; i++){
    bubbles[i].draw();
  }

  player.draw();
}


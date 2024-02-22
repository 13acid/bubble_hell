
// ____  __  __  ____  ____  __    ____    _   _  ____  __    __
//(  _ \(  )(  )(  _ \(  _ \(  )  ( ___)  ( )_( )( ___)(  )  (  )
// ) _ < )(__)(  ) _ < ) _ < )(__  )__)    ) _ (  )__)  )(__  )(__
//(____/(______)(____/(____/(____)(____)  (_) (_)(____)(____)(____)

// KEYBOARD CONTROLS

const controls = {
  start: function(){
    controls.keys = [];
    window.addEventListener('keydown', function (e) {
      controls.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
      controls.keys[e.keyCode] = false;
    })
  }
}

// GAME FUNCTIONS

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
    super(x, y, 0, 0, 10, "white", "black", 5);
    this.isPlayer = true;
  }

  update(){
    if(!this.dead()){ 
      if(controls.keys[37] && this.x - this.radius > 0) {this.x = this.x - 2;} 
      if(controls.keys[39] && this.x + this.radius < canvas.width) {this.x = this.x + 2;} 
      if(controls.keys[38] && this.y - this.radius > 0) {this.y = this.y - 2;} 
      if(controls.keys[40] && this.y + this.radius < canvas.height) {this.y = this.y + 2;} 
    }
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
    super(x, y, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.floor(5 + Math.random() * 35),  getRandomBubbleColour(), "red", 1);
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
      bubbles[i].hp -= 1;
      return true;
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
    if (bubbles[i].hp <= 0 && player.hp > 0){
      bubbles.splice(i,1);
    }
  }
}

function spawnInitialBubbles() {

  for(i=0;i<10;i++){
    let x = Math.floor(Math.random() * (canvas.width - 75 * 2) + 75);
    let y = Math.floor(Math.random() * (canvas.height - 75 * 2) + 75);

    bubbles.push(new StraightBubble(x, y))
  }
}

function spawnNewBubble() {
  let spawnPoint = getRandomInt(bubbles.length);
  if(score % 100 === 0) {
    bubbles.push(new StraightBubble(bubbles[spawnPoint].x,bubbles[spawnPoint].y));
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


// DRAWING TO CANVAS

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

function getRandomInt(max){
  return Math.floor(Math.random() * max);
}

function getRandomBubbleColour() {
  let r = getRandomInt(255);
  let g = getRandomInt(255);
  let b = getRandomInt(255);
  let a = "0.7";

  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

function drawText(){
  ctx.textAlign = "start";
  ctx.font = "bold 20px monospace";
  ctx.fillText("SCORE: " + score, 5, 20);

  if(player.hp > 0){
    ctx.fillText("HP: " + player.hp, 5, 40);
  }else{
    ctx.fillText("GAME OVER", 5, 40);
  }
  
  ctx.textAlign = "end";
  ctx.fillText("HI SCORE: " + getHiScore(), 495, 20)
  ctx.fillText("BUBBLES: " + bubbles.length, 495, 40)
}


//HI SCORE

function increaseScore() {
  if(!player.dead()) {
    score += 1;
  }
}

function setHiScore(){
 if(localStorage) {
    if (hiScore < score){
      localStorage.setItem("hiScore", score);
    }
  }
}

function getHiScore(){
  if(localStorage) {
    return localStorage.getItem("hiScore");
  }
}

// GAME START

function startGame() {
  controls.start();
  
  player = new Player(25, 60);
  bubble = new StraightBubble(100, 100);
  hiScore = localStorage.getItem("hiScore");

  bubbles = [];
  score = 0;
  spawnInitialBubbles();
}

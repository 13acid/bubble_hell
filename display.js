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
  ctx.font = "bold 20px monospace"
  ctx.fillText("SCORE: " + score, 5, 20);

  if(player.hp > 0){
    ctx.fillText("HP: " + player.hp, 5, 40);
  }else{
    ctx.fillText("GAME OVER", 5, 40);
  }
}

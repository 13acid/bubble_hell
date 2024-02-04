class Bubble {
  constructor(x, y, radius, fs, ss, hp){
    this.x = x;
    this.y = y;
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
    super(x, y, 10, "white", "black", 10);
    this.isPlayer = true;
  }
}

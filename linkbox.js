
class Linkbox {
  constructor(link, pos){
    this.link = link;
    this.pos = pos;
  }


  checkMouseOver(x, y){
    //checks whether mouse is over box, returns true or false
    if (mouseX >= x - boxSize && mouseX <= x + boxSize
    && mouseY >= y - boxSize && mouseY <= y + boxSize){
      push();
      rectMode(CENTER);
      noFill();
      stroke(biro);
      rect(x, y, (boxSize) + 6, (boxSize) + 6);
      pop();
      return true;
    }

    else {
      return false;
    }
  }


  drawBox(x, y){
    push();
    rectMode(CENTER);
    fill(biro);
    noStroke();
    rect(x, y, boxSize, boxSize);

    if (y <= 100){
      rect(x, y + boxSize, 1, 10);
    }
    else{
      rect(x, y - boxSize, 1, 10);
    }
    pop();
  }
}

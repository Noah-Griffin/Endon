var boxSize = 10;
var narrativeIndex = 0;
var topTextPos, bottomTextPos, topTextWidth, bottomTextWidth;
var topTextScroll, bottomTextScroll, topTextInc, bottomTexInc;
var biro;
var touchStartPosition, moved = 0;
var mousePositions = [];

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  background(255);

  biro = color(20, 40, 140);

  topTextPos = windowWidth + 10;
  bottomTextPos = windowWidth + 10;

  for(i = 0; i < narrative.length; i++){
    if (narrative[i].length >= 2){
      if (narrative[i][2] == 'top'){
        boxes[i] = new Linkbox(narrative[i][3], 'top');
      }
      if (narrative[i][2] == 'bottom'){
        boxes[i] = new Linkbox(narrative[i][3], 'bottom');
      }
    }
  }
}


function draw() {
  background(255);

  //main bars
  push();
  stroke(biro);
  noFill();
  rect(-20, 40, windowWidth + 40, 60);
  rect(-20, 110, windowWidth + 40, 60);
  pop();

  drawText();
  checkBox();
}


function checkBox(){
  if (boxes[narrativeIndex] != null){
    if (boxes[narrativeIndex].pos == 'top'){
      boxes[narrativeIndex].drawBox(topTextPos + 5, 25);
      if (boxes[narrativeIndex].checkMouseOver(topTextPos + 5, 25)){
        return true;
      }
    }
    if (boxes[narrativeIndex].pos == 'bottom'){
      boxes[narrativeIndex].drawBox(bottomTextPos + 5, 185);
      if (boxes[narrativeIndex].checkMouseOver(bottomTextPos + 5, 185)){
        return true;
      }
    }
    else{
      return false;
    }
  }
}


function checkText(){
  textSize(41);
  topTextWidth = textWidth(narrative[narrativeIndex][0]);
  bottomTextWidth = textWidth(narrative[narrativeIndex][1]);

  var textRatio = topTextWidth + bottomTextWidth;

  topTextInc = (windowWidth + 10 + topTextWidth) / textRatio;
  bottomTextInc = (windowWidth + 10 + bottomTextWidth) / textRatio;

  if ((topTextPos <= -topTextWidth - 10 && bottomTextPos - 10 <= -bottomTextWidth) && narrativeIndex < narrative.length){
    narrativeIndex += 1;

    topTextPos = windowWidth + 5;
    bottomTextPos = windowWidth + 5;
  }

  if (narrativeIndex >= narrative.length){
    narrativeIndex = 0;
  }

  if (topTextPos >= windowWidth + 10 && bottomTextPos >= windowWidth + 10){

    if (narrativeIndex > 0){
      narrativeIndex -= 1;

      topTextWidth = textWidth(narrative[narrativeIndex][0]);
      bottomTextWidth = textWidth(narrative[narrativeIndex][1]);

      bottomTextPos = -bottomTextWidth;
      topTextPos =  -topTextWidth;
    }

    if (narrativeIndex < 0){
      narrativeIndex = narrative.length;
    }
  }

  topTextScroll = map(topTextInc, 0, 2, 0, 0.6);
  bottomTextScroll = map(bottomTextInc, 0, 2, 0, 0.6);
}


function drawText(){
  push();
  textSize(40);
  fill(biro);
  textFont('Playfair Display');
  text(narrative[narrativeIndex][0], topTextPos, 85);
  text(narrative[narrativeIndex][1], bottomTextPos, 155);
  pop();
}


function windowResized() {
  resizeCanvas(windowWidth, 200);
}


function mouseWheel() {
  checkText();
  topTextPos -= event.delta * topTextScroll;
  bottomTextPos -= event.delta * bottomTextScroll;
}


function touchMoved(){
  append(mousePositions, mouseY);
  checkMousePositions();
}


function checkMousePositions(){
  checkText();
  if (mousePositions[mousePositions.length - 1] < mousePositions[mousePositions.length - 2]){
    topTextPos -= topTextScroll * 20;
    bottomTextPos -= bottomTextScroll * 20;
  }
  if (mousePositions[mousePositions.length - 1] > mousePositions[mousePositions.length - 2]){
    topTextPos += topTextScroll * 20;
    bottomTextPos += bottomTextScroll * 20;
  }
}


function touchStarted(){
  append(mousePositions, touchStartPosition);
  for(i = 0; i < boxes.length; i++){
    if (boxes[i] != null){
      if (checkBox()){
        window.open(boxes[i].link);
      }
    }
  }
}

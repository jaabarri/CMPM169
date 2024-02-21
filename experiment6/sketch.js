'use strict';

var textTyped = '';
var font;

var shapeSpace;
var shapeSpace2;
var shapePeriod;
var shapeComma;
var shapeQuestionmark;
var shapeExclamationmark;
var shapeReturn;

var centerX;
var centerY;
var offsetX;
var offsetY;
var zoom;

var actRandomSeed;

var axiom = 'F';
var sentence = axiom;
var rules = [];
var len = 15;
var branchAngle;

function preload() {
  font = loadFont('data/miso-bold.ttf');
  shapeSpace = loadImage('data/space.svg');
  shapeSpace2 = loadImage('data/space2.svg');
  shapePeriod = loadImage('data/period.svg');
  shapeComma = loadImage('data/comma.svg');
  shapeExclamationmark = loadImage('data/exclamationmark.svg');
  shapeQuestionmark = loadImage('data/questionmark.svg');
  shapeReturn = loadImage('data/return.svg');
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');

  textTyped += 'Ich bin der Musikant mit Taschenrechner in der Hand!\n\n';
  textTyped += 'Ich addiere\n';
  textTyped += 'Und subtrahiere, \n\n';
  textTyped += 'Kontrolliere\nUnd komponiere\nUnd wenn ich diese Taste drück,\nSpielt er ein kleines Musikstück?\n\n';

  textTyped += 'Ich bin der Musikant mit Taschenrechner in der Hand!\n\n';
  textTyped += 'Ich addiere\n';
  textTyped += 'Und subtrahiere, \n\n';
  textTyped += 'Kontrolliere\nUnd komponiere\nUnd wenn ich diese Taste drück,\nSpielt er ein kleines Musikstück?\n\n';

  centerX = width / 2;
  centerY = height / 2;
  offsetX = 0;
  offsetY = 0;
  zoom = 0.75;

  actRandomSeed = 6;

  cursor(HAND);
  textFont(font, 25);
  textAlign(LEFT, BASELINE);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(random(255), random(255), random(255), 5); // Random background color with low opacity

  if (mouseIsPressed && mouseButton == LEFT) {
    centerX = mouseX - offsetX;
    centerY = mouseY - offsetY;
  }

  randomSeed(actRandomSeed);

  translate(centerX, centerY);
  scale(zoom);

  for (var i = 0; i < textTyped.length; i++) {
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter);

    switch (letter) {
      case ' ':
        var dir = floor(random(0, 2));
        if (dir == 0) {
          fill(random(255), random(255), random(255), random(200, 255)); // Random color and opacity
          textSize(random(20, 40));
          textStyle(random([NORMAL, BOLD, ITALIC]));
          text(letter, 0, 0);
          translate(4, 12);
          rotate(QUARTER_PI);
        }
        if (dir == 1) {
          fill(random(255), random(255), random(255), random(200, 255));
          textSize(random(20, 40));
          textStyle(random([NORMAL, BOLD, ITALIC]));
          text(letter, 0, 0);
          translate(14, -5);
          rotate(-QUARTER_PI);
        }
        break;

      case ',':
      case '.':
      case '!':
      case '?':
      case '\n':
        fill(random(255), random(255), random(255), random(200, 255));
        textSize(random(20, 40));
        textStyle(random([NORMAL, BOLD, ITALIC]));
        text(letter, 0, 0);
        translate(10, 10);
        break;

      default:
        fill(random(255), random(255), random(255), random(200, 255));
        textSize(random(20, 40));
        textStyle(random([NORMAL, BOLD, ITALIC]));
        text(letter, 0, 0);
        translate(letterWidth + 10, 0);
    }
  }

  // L-System branching structure
  drawLSystem();
  if (frameCount / 6 % 2 == 0) rect(0, 0, 15, 2);
}

function mousePressed() {
  offsetX = mouseX - centerX;
  offsetY = mouseY - centerY;
}

function keyReleased() {
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode == ALT) actRandomSeed++;
}

function keyPressed() {
  switch (keyCode) {
    case DELETE:
    case BACKSPACE:
      textTyped = textTyped.substring(0, max(0, textTyped.length - 1));
      break;

    case ENTER:
    case RETURN:
      textTyped += '\n';
      break;

    case UP_ARROW:
      zoom += 0.05;
      break;

    case DOWN_ARROW:
      zoom -= 0.05;
      break;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
  }
}

function drawLSystem() {
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current == 'F') {
      stroke(random(255), random(255), random(255), random(200, 255)); // Random stroke color and opacity
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == '+') {
      rotate(branchAngle);
    } else if (current == '-') {
      rotate(-branchAngle);
    } else if (current == '[') {
      push();
    } else if (current == ']') {
      pop();
    }
  }
}

function generate() {
  var nextSentence = '';
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
}

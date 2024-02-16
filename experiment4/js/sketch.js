'use strict';

var capture;
var drawingColor;
var capturePaused = false;

function setup() {
  createCanvas(640 * .5, 480*.5);
  capture = createCapture(VIDEO, function() {
    // Callback function to handle successful video initialization
    capture.size(width, height);
    capture.hide(); // Hide the video feed as we will draw it on the canvas
  });
  drawingColor = color(255, 0, 0); // Initial drawing color (red)
}

function draw() {
  // Draw the video feed onto the canvas
  //image(capture, 0, 0, width, height);


  // Copy a region from the video feed with a random offset when paused
  if (capturePaused) {
    var x1 = floor(random(width));
    var y1 = floor(random(height));

    var x2 = x1 + floor(random(-50, 20));
    var y2 = y1 + floor(random(-10, 10));

    var w = 60;
    var h = 25;

    copy(capture, x1, y1, w, h, x2, y2, w, h);
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) clear();
}

function mousePressed() {
  // Toggle camera pause on mouse click
  capturePaused = !capturePaused;
  if (capturePaused) {
    capture.pause();
    capture.hide();
  } else {
    capture.play();
    capture.show();
  }
}

'use strict';

var sketch = function(p) {

  var actRandomSeed = 0;
  var count = 300;

  var animationSpeed = 0.01;
  var animationAngle = 0;

  var fadeRate = 3; // Adjust the fade rate

  var shapeType = 'circle'; // Initial shape type
  
  var backgroundOn = false;

  p.setup = function() {
    p.createCanvas(800, 800);
    p.cursor(p.CROSS);
    p.noStroke();
    p.fill(0, 130, 164); // Color for dots
  };

  p.draw = function() {
    // Draw subtle noise background (commented for now)
    if(backgroundOn) {
      p.background(0);
      p.fill(240, 240, 240);
      for (var i = 0; i < p.width; i += 10) {
        for (var j = 0; j < p.height; j += 10) {
          var noiseVal = p.noise(i * 0.01, j * 0.01);
          var gray = p.map(noiseVal, 0, 1, 220, 255);
          p.fill(gray);
          p.rect(i, j, 10, 10);
        }
      }
    }

    var faderX = p.mouseX / p.width;

    p.randomSeed(actRandomSeed);
    var angle = p.radians(360 / count);
    for (var i = 0; i < count; i++) {
      // positions
      var randomY = p.random(0, p.width);
      var randomX = p.random(0, p.height);
      var circleX = p.width / 2 + p.cos(angle * i + animationAngle) * 50;
      var circleY = p.height / 2 + p.sin(angle * i + animationAngle) * 150;

      var squareX = p.width / 2 + p.cos(angle * i + animationAngle) * 50;
      var squareY = p.height / 2 + p.sin(angle * i + animationAngle) * 150;

      var x, y;

      var alphaValue = p.map(i, 0, count, 255, 0); // Fade out effect

      if (shapeType === 'circle') {
        x = p.lerp(randomX, circleX, faderX);
        y = p.lerp(randomY, circleY, faderX);
        p.fill(0, 130, 164, alphaValue);
        p.ellipse(x, y, 11, 11);
      } else if (shapeType === 'square') {
        x = p.lerp(randomX, squareX, faderX);
        y = p.lerp(randomY, squareY, faderX);
        p.fill(0, 130, 164, alphaValue);
        p.rect(x - 5.5, y - 5.5, 11, 11); // Adjust position to center the square
      }
    }

    // Increment the animation angle
    animationAngle += animationSpeed;
  };

  p.mousePressed = function() {
    backgroundOn = !backgroundOn;
    actRandomSeed = p.random(100000);
    // Toggle between circle and square
    shapeType = (shapeType === 'circle') ? 'square' : 'circle';
  };

  p.keyReleased = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(p.timestamp(), 'png');
  };
};

var myp5 = new p5(sketch);

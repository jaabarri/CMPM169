let shapes = ['circle', 'rectangle', 'ellipse'];
let drawing = true;
let drawnShapes = [];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  // Draw the stored shapes
  for (let i = 0; i < drawnShapes.length; i++) {
    let shape = drawnShapes[i];
    fill(shape.fillColor);
    noStroke();

    push(); // Save the current transformation state
    translate(shape.x || 0, shape.y || 0); // Add default values for x and y

    if (drawing) {
      // Add rotation animation when drawing
      rotate(frameCount * 0.01);
    }

    if (shape.type === 'circle') {
      ellipse(0, 0, shape.width, shape.height);
    } else if (shape.type === 'rectangle') {
      rect(0, 0, shape.width, shape.height);
    } else if (shape.type === 'ellipse') {
      ellipse(0, 0, shape.width, shape.height);
    }

    pop(); // Restore the previous transformation state
  }

  if (drawing) {
    // Generate and draw a random shape
    let randomShape = random(shapes);
    let shape;

    if (randomShape === 'circle') {
      shape = drawCircle();
    } else if (randomShape === 'rectangle') {
      shape = drawRectangle();
    } else if (randomShape === 'ellipse') {
      shape = drawEllipse();
    }

    // Store the shape's attributes in the array
    drawnShapes.push(shape);
  }
}

function drawCircle() {
  let x = random(width);
  let y = random(height);
  let diameter = random(20, 100);
  let fillColor = color(random(255), random(255), random(255), 150);

  fill(fillColor);
  noStroke();
  ellipse(x, y, diameter, diameter);

  return { type: 'circle', x, y, width: diameter, height: diameter, fillColor };
}

function drawRectangle() {
  let x = random(width);
  let y = random(height);
  let rectWidth = random(20, 100);
  let rectHeight = random(20, 100);
  let fillColor = color(random(255), random(255), random(255), 150);

  fill(fillColor);
  noStroke();
  rect(x, y, rectWidth, rectHeight);

  return { type: 'rectangle', x, y, width: rectWidth, height: rectHeight, fillColor };
}

function drawEllipse() {
  let x = random(width);
  let y = random(height);
  let ellipseWidth = random(20, 100);
  let ellipseHeight = random(20, 100);
  let fillColor = color(random(255), random(255), random(255), 150);

  fill(fillColor);
  noStroke();
  ellipse(x, y, ellipseWidth, ellipseHeight);

  return { type: 'ellipse', x, y, width: ellipseWidth, height: ellipseHeight, fillColor };
}

function mousePressed() {
  // Toggle drawing on/off when the mouse is pressed
  if (drawing) {
    drawing = false;
  } else {
    drawing = true;
  }
}

let angleX = 0;
let angleY = 0;
let table;
let r = 200;
let earth;
let bgColor;
let particles = [];
let hoveredIndex = -1; // Index of the hovered earthquake
let highlightThreshold = 5; // Adjust the threshold for highlighting

function preload() {
  earth = loadImage('earth.jpg');
  table = loadTable(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.csv',
    'header'
  );
}

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.parent('canvas-container');
  bgColor = color(0);

  // Initialize particle system
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(bgColor);

  // Control rotation with mouse
  if (mouseIsPressed) {
    angleX += (pmouseY - mouseY) * 0.01;
    angleY += (mouseX - pmouseX) * 0.01;
  }

  rotateX(angleX);
  rotateY(angleY);

  lights();
  noStroke();
  texture(earth);
  sphere(r);

  // Dynamic background color
  bgColor = color(
    map(sin(angleX * 0.1), -1, 1, 20, 50),
    map(sin(angleY * 0.2), -1, 1, 0, 50),
    map(sin(angleX * 0.15), -1, 1, 20, 70)
  );

  // Update and display particles
  for (let particle of particles) {
    particle.update();
    particle.display();
  }

  // Iterate through earthquake data and draw pulsating, colorful boxes
  for (let i = 0; i < table.rows.length; i++) {
    let row = table.rows[i];
    let lat = row.getNum('latitude');
    let lon = row.getNum('longitude');
    let mag = row.getNum('mag');

    let theta = radians(lat);
    let phi = radians(lon) + PI;

    let x = r * cos(theta) * cos(phi);
    let y = -r * sin(theta);
    let z = -r * cos(theta) * sin(phi);

    let pos = createVector(x, y, z);

    let h = pow(10, mag);
    let maxh = pow(10, 7);
    h = map(h, 0, maxh, 10, 100);
    let xaxis = createVector(1, 0, 0);

    let angleb = abs(xaxis.angleBetween(pos));
    let raxis = xaxis.cross(pos);

    // Pulsating effect based on sine function
    let pulse = map(sin(angleX * 0.5), -1, 1, 0.8, 1.2);

    push();
    translate(x, y, z);
    rotate(angleb, raxis);

    // Check if the mouse is hovering over the earthquake point
    let screenPos = createVector(mouseX - width / 2, mouseY - height / 2, 0);
    let distance = screenPos.dist(createVector(x, y, 0));

    if (distance < highlightThreshold) {
      hoveredIndex = i; // Store the hovered earthquake index
      console.log(`Hovered over earthquake ${i + 1}`);
      console.log(`Magnitude: ${mag}, Latitude: ${lat}, Longitude: ${lon}`);
    }

    // Color variation based on magnitude and pulsating effect
    let magColor = color(
      map(mag, 4.5, 9, 50, 255),
      map(mag, 4.5, 9, 0, 50),
      map(mag, 4.5, 9, 200, 50),
      150
    );
    fill(magColor);

    box(h * pulse, 5 * pulse, 5 * pulse);
    pop();
  }

  // Reset the hovered earthquake index when the mouse is not over any earthquake point
  if (hoveredIndex === -1) {
    hoveredIndex = -1;
  }
}

// Particle class for the background
class Particle {
  constructor() {
    this.pos = createVector(random(-width, width), random(-height, height), random(-500, 500));
    this.vel = createVector(0, 0, random(1, 5));
    this.size = random(1, 5);
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.z > 500) {
      this.pos.z = -500;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();
    fill(255, 150);
    sphere(this.size);
    pop();
  }
}

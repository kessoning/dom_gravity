// Mouse attributes
var mouseMass = 20;
var mouseGravity = 5;
var mouseLocation;

// DOM elements
var domLocation = [];
var domVelocity = [];
var domAcceleration = [];
var domMass = [];

// This will store all DOM elements
var elements;

function setup() {
  noCanvas();

  mouseLocation = createVector(windowWidth / 2, windowHeight / 2);

  // Create a new paragraph with a random char in it
  var c = char(floor(random(127)));						// Pick a random char
  var p = createP(c);									// Create new paragraph
  var pos = createVector(random(windowWidth), random(windowHeight));		// Create a vector to store a random position in window
  p.class('particles');									// Set class for this paragraph to .particles
  p.position(pos.x, pos.y);								// Set the position of the paragraph
  domLocation.push(createVector(pos.x, pos.y));			// Add a vector for storing the position of this paragraph
  domVelocity.push(createVector(1, 0));					// Add a vector to store the velocity of this paragraph
  domAcceleration.push(createVector(0, 0));				// Add a vector to store the acceleration of this paragraph
  domMass.push(random(0.1, 2));							// Add a random mass to this paragraph
  elements = selectAll('.particles');					// This will store all the .particles elements
}

function draw() {
	// Set the position of the mouse
  mouseLocation.x = mouseX;
  mouseLocation.y = mouseY;

  // If the animation is still smooth, then add another paragraph
  if (frameRate() > 30) {
    var c = char(floor(random(127)));
    var p = createP(c);
    p.style('color', '#ffffff');
    var pos = createVector(random(windowWidth), random(windowHeight));
    p.class('particles');
    p.position(pos.x, pos.y);
    domLocation.push(createVector(pos.x, pos.y));
    domVelocity.push(createVector(1, 0));
    domAcceleration.push(createVector(0, 0));
    domMass.push(random(0.1, 2));
    elements = selectAll('.particles');
  }

  // Calculate the position of each paragraph with physics
  // Thanks to Nature of code by Daniel Shiffman
  for (var i = 0; i < elements.length; i++) {
    var force = p5.Vector.sub(mouseLocation, domLocation[i]);			// Calculate the direction of the force
    var d = force.mag();												// Distance between objects
    d = constrain(d, 5, 25);											// Limiting the distance to eliminate "extreme" results for very close or very far objects
    force.normalize();													// Normalize vector (distance doesn't mattere here, we just want this vector for direction)
    var strength = (mouseGravity * domMass[i] * mouseMass) / (d * d);	// Calculate gravitational force magnitude
    force.mult(strength);												// Get the force vector --> magnitude * direction
    var f = p5.Vector.div(force, domMass[i]);							
    domAcceleration[i].add(f);
    domVelocity[i].add(domAcceleration[i]);
    domVelocity[i].limit(10);
    domLocation[i].add(domVelocity[i]);
    domAcceleration[i].mult(0);
    elements[i].position(domLocation[i].x, domLocation[i].y);			// Update the position of this DOM element
  }
}
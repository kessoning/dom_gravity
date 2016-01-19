var mouseMass = 20;
var mouseG = 5;
var mouseLocation;

var domLocation = [];
var domVelocity = [];
var domAcceleration = [];
var domMass = [];

var elements;

var font;

var intro;
var byk;

function preload() {
  font = loadFont("assets/SourceCodePro-ExtraLight.ttf");
}

function setup() {
  noCanvas();

  mouseLocation = createVector(windowWidth / 2, windowHeight / 2);

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

  //intro = select('#intro');
  //intro.position(0, windowHeight*0.75);
  //intro.position(0, windowHeight*0.75);
  //intro.style('color', '#fff');
  //intro.style('font-size', '24px');
  //intro.style('text-align', 'left');
}

function draw() {
  mouseLocation.x = mouseX;
  mouseLocation.y = mouseY;

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

  for (var i = 0; i < elements.length; i++) {
    var force = p5.Vector.sub(mouseLocation, domLocation[i]);
    var d = force.mag();
    d = constrain(d, 5, 25);
    force.normalize();
    var strength = (mouseG * domMass[i] * mouseMass) / (d * d);
    force.mult(strength);
    var f = p5.Vector.div(force, domMass[i]);
    domAcceleration[i].add(f);
    domVelocity[i].add(domAcceleration[i]);
    domVelocity[i].limit(10);
    domLocation[i].add(domVelocity[i]);
    domAcceleration[i].mult(0);
    elements[i].position(domLocation[i].x, domLocation[i].y);
  }
}
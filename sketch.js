var population;

function setup() {
  createCanvas(1000, 800);

  population = new Population();
  // test.applyForce(createVector(0, -5))
}

function draw() {
  background(0);
  population.run();
}

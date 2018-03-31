var population;
var lifespan = 200;
var count = 0;
var target;

function setup() {
  createCanvas(600, 400);

  population = new Population();

  target = createVector(width / 2, 50);
}

function draw() {
  background(0);
  population.run();
  count++;

  ellipse(target.x, target.y, 16, 16)

  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
  }
}
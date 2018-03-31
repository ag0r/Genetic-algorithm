var population;
var lifespan = 200;
var count = 0;
var target;
var generationParagraph;
var generationText = 0;
var obstacle;

function setup() {
  createCanvas(600, 400);

  population = new Population();

  target = createVector(width / 2, 50);

  obstacle = new Obstacle();

  generationParagraph = createP("Generation: " + generationText);
}

function mouseClicked() {
  if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
    target.x = mouseX;
    target.y = mouseY;

    return false;
  }
}

function draw() {
  // target.x = mouseX
  // target.y = mouseY
  background(0);
  obstacle.show();
  population.run();
  count++;

  ellipse(target.x, target.y, 16, 16);
  // ellipse(mouseX, mouseY, 16, 16);

  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
    generationText++;
    generationParagraph.html("Generation: " + generationText)
  }
}
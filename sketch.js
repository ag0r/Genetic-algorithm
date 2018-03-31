var population;
var lifespan = 200;
var count = 0;
var target;
var generationParagraph;
var generationText = 0;

function setup() {
  createCanvas(600, 400);

  population = new Population();

  target = createVector();

  generationParagraph = createP("Generation: " + generationText);
}

function draw() {
  target.x = mouseX
  target.y = mouseY
  background(0);
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
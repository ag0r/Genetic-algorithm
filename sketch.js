var population;
var lifespan = 200;
var count = 0;
var target;
var generationParagraph;
var generationText = 0;
var obstacle;
var cooldown = 0;
var grabbed = false;
var cornerClicked = false;

function setup() {
  createCanvas(600, 400);

  population = new Population();

  target = createVector(width / 2, 50);

  obstacle = new Obstacle();

  generationParagraph = createP("Generation: " + generationText);
}

function mouseDragged() {
  cooldown = 20;
  var mousePos = createVector(mouseX, mouseY)
  if ((obstacle.isInside(mousePos) || grabbed) && !obstacle.onCorner(mousePos)) {
    grabbed = true;

    diffX = mouseX - pmouseX;
    diffY = mouseY - pmouseY;

    obstacle.translate(createVector(diffX, diffY))
  }
  return false;
}

function mouseClicked() {
  var mousePos = createVector(mouseX, mouseY)
  if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0 && cooldown == 0 &&
      !cornerClicked &&
      !obstacle.onCorner(mousePos)) {
    if (!obstacle.isInside(mousePos)) {
      target.x = mouseX;
      target.y = mouseY;
    }
  } else if (obstacle.onCorner(mousePos)) {
    grabbed = true;
    cornerClicked = true;
  } else if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0 && cooldown == 0 && cornerClicked) {
    cornerClicked = false;
  }
  return false;
}

function keyPressed() {
  if (cornerClicked) {
    if (keyCode === LEFT_ARROW) {
      obstacle.rotate(PI / 32)
    } else if (keyCode === RIGHT_ARROW) {
      obstacle.rotate(-PI / 32)
    } else if (keyCode === UP_ARROW) {
      obstacle.rotate(PI / 8)
    } else if (keyCode === DOWN_ARROW) {
      obstacle.rotate(-PI / 8)
    }
  }

  return false;
}

function draw() {
  mousePos = createVector(mouseX, mouseY);
  background(0);
  obstacle.show();
  population.run();
  count++;

  ellipse(target.x, target.y, 16, 16);

  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
    generationText++;
    generationParagraph.html("Generation: " + generationText)
  }

  if (cooldown > 0) {
    cooldown -= 1;
  }

  if (cooldown == 0) {
    grabbed = false;
  }
}

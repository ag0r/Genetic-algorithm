function Obstacle() {
  this.position = createVector(width / 2, height / 2);
  this.height = 20;
  this.width = 100;

  this.collide = function(individual) {
    if (individual.position.x > this.position.x - (.5 * this.width) &&
      individual.position.x < this.position.x + (.5 * this.width) &&
      individual.position.y > this.position.y - (0.5 * this.height) &&
      individual.position.y < this.position.y + (0.5 * this.height)) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}
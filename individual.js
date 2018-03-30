function Individual() {
  this.height = 10
  this.width = 50
  this.position = createVector(width / 2, height - this.height / 2);
  this.velocity = p5.Vector.fromAngle(random(-PI, 0));
  this.acceleration = createVector();

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.show = function() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    // print(this.velocity.heading());
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
  }
}

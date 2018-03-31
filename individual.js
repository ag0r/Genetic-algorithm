function Individual(dna) {
  this.height = 5;
  this.width = 25;
  this.position = createVector(width / 2, height - this.height / 2);
  this.velocity = createVector();
  this.acceleration = createVector();

  this.fitness = 0;

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

  this.crashed = false;
  this.succeeded = false;

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.evaluate = function() {
    if (!this.crashed) {
      var d = dist(this.position.x, this.position.y, target.x, target.y);

      this.fitness = 1 / d;

      if (this.succeeded) {
        this.fitness *= 210 * (1 / this.quickness);
      }
    }
  }

  this.update = function() {
    if (dist(this.position.x, this.position.y, target.x, target.y) < 10) {
      this.succeeded = true;
      this.quickness = count;
    }

    if (!this.succeeded) {
      this.applyForce(this.dna.genes[count]);
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);

      if (this.position.x < 0 || this.position.x > width) {
        if (this.position.x < 0) {
          this.position.x = 0;
        } else if (this.position.x > width) {
          this.position.x = width;
        }
        this.velocity.x *= -1;
        this.velocity.mult(0.8);
      }

      if (this.position.y > height) {
        this.crashed = true;
        this.fitness = 0;
      }

      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y *= -1;
        this.velocity.mult(0.8);
      }
    }
  }

  this.show = function() {
    push();
    noStroke();
    fill(255, 150);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
  }
}
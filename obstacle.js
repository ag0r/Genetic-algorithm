function Obstacle() {
  this.height = 20;
  this.width = 100;
  this.cornerTolerance = 8;
  this.corners = [];

  this.corners.push(createVector(width / 2 - 50, height / 2 - 10));
  this.corners.push(createVector(width / 2 + 50, height / 2 - 10));
  this.corners.push(createVector(width / 2 + 50, height / 2 + 10));
  this.corners.push(createVector(width / 2 - 50, height / 2 + 10));

  this.collide = function(individual) {
    if (!individual.crashed){
      if (this.isInside(individual.position)) {
        return true;
      } else {
        return false;
      }
    }
  }

  this.isInside = function(otherPosition) {
    // use top left corner of quadrilateral as origin, so it can be set to 0, 0
    origin = createVector();
    // downVector is the vector pointing from origin to the bottom left corner
    downVector = p5.Vector.sub(this.corners[3], this.corners[0]);
    // rightVector is the vector pointing from origin to the top right corner
    rightVector = p5.Vector.sub(this.corners[1], this.corners[0]);
    // pointVector is otherPosition translated into the space of the quadrilateral
    pointVector = p5.Vector.sub(otherPosition, this.corners[0]);

    if ((0 <= pointVector.dot(downVector) && pointVector.dot(downVector) <= downVector.dot(downVector)) &&
        (0 <= pointVector.dot(rightVector) && pointVector.dot(rightVector) <= rightVector.dot(rightVector))) {
          return true;
        } else {
          return false;
        }
  }

  this.onCorner = function(otherPosition) {
    for (var i = 0; i < this.corners.length; i++) {
      if (abs(p5.Vector.dist(this.corners[i], otherPosition)) < this.cornerTolerance) {
        return true;
      }
    }

    return false;
  }

  this.center = function() {
    c = createVector();

    for (var i = 0; i < this.corners.length; i++) {
      c.x += this.corners[i].x;
      c.y += this.corners[i].y;
    }

    return c.div(this.corners.length);
  }

  this.rotate = function(angle) {
    // 0 = top left
    // 1 = top right
    // 2 = bottom right
    // 3 = bottom left
    newCorners = [];
    this.position = this.center();

    for (var i = 0; i < 4; i++) {
      newCorners[i] = createVector();
      newCorners[i].x = this.position.x + (this.corners[i].x - this.position.x) * cos(angle) + (this.corners[i].y - this.position.y) * sin(angle)
      newCorners[i].y = this.position.y - (this.corners[i].x - this.position.x) * sin(angle) + (this.corners[i].y - this.position.y) * cos(angle)
    }

    this.corners = newCorners;
  }

  this.translate = function(changeVector) {
    for (var i = 0; i < this.corners.length; i++) {
      this.corners[i].add(changeVector);
    }
  }

  this.show = function() {
    push();
    noStroke();
    fill(255);
    rectMode(CENTER);
    quad(this.corners[0].x, this.corners[0].y,
         this.corners[1].x, this.corners[1].y,
         this.corners[2].x, this.corners[2].y,
         this.corners[3].x, this.corners[3].y);
    pop();
  }
}

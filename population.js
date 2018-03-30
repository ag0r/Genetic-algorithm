function Population() {
  this.individuals = [];
  this.populationSize = 3;

  for(var i = 0; i < this.populationSize; i++) {
    this.individuals[i] = new Individual();
  }


  this.run = function() {
    for(var i = 0; i < this.populationSize; i++) {
      this.individuals[i].update();
      this.individuals[i].show();
    }
  }
}

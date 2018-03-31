function Population() {
  this.individuals = [];
  this.populationSize = 25;

  this.matingPool = []

  for (var i = 0; i < this.populationSize; i++) {
    this.individuals[i] = new Individual();
  }


  this.run = function() {
    for (var i = 0; i < this.populationSize; i++) {
      this.individuals[i].update();
      this.individuals[i].show();
    }
  }

  this.evaluate = function() {
    var maxFit = 0;

    for (var i = 0; i < this.populationSize; i++) {
      this.individuals[i].evaluate();

      if (this.individuals[i].fitness > maxFit) {
        maxFit = this.individuals[i].fitness;
      }
    }

    for (var i = 0; i < this.populationSize; i++) {
      this.individuals[i].fitness /= maxFit;
    }

    for (var i = 0; i < this.populationSize; i++) {
      var n = this.individuals[i].fitness * 100;

      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.individuals[i]);
      }
    }
  }

  this.selection = function() {
    var newIndividuals = []
    for (var i = 0; i < this.individuals.length; i++) {
      var parentA = random(this.matingPool).dna;
      var parentB = random(this.matingPool).dna;
      var childDNA = parentA.crossOver(parentB);

      newIndividuals[i] = new Individual(childDNA);
    }

    this.individuals = newIndividuals
  }
}
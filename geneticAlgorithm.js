jQuery.getScript('https://raw.github.com/mazzola/deepRed/master/gameState.js'); //Game State variables
jQuery.getScript('https://raw.github.com/mazzola/deepRed/master/utility.js'); //Utility functions

/**
 * Performs a genetic algorithm on a set of given hueuristic functions
 * and sequences of moves. Returns 
 */
function geneticAlgorithm(population) {
  // Generate the scores for each sequence of moves
  sequenceScorse = [];
  for (var i = 0; i < population.length; i++) {
    sequenceScores.push(fitness(population[i]));
  }
  matingProbability = matingProbability(sequenceScores);


}

DEATH = -1;
GAME_OVER = 2;

function fitness(sequence) {
  score = 0;
  for (var i = 0; i < a.length; i++) {
    move = sequence[i];
    if (move != null) {
      switch(move.move) {
        case KEY_LEFT:
          score = score + 100;
          break;
        case KEY_RIGHT:
          score = score + 1;
          break;
        case KEY_JUMP:
          score = score + 2;
          break;
        case DEATH:
          score = score + 100000;
          break;
        case GAME_OVER:
          score = score + 1000000;
          i = array.length;
          break;
      }
      if (isMatch(move.pipe, pipe)) {
        score = score + 10;
      }
    }
  }
  return score;
}

function matingProbability(scores) {
  matingProbabilities = []
  total = 0;
  for (var i = 0; i < scores.length; i++) {
    total = total + scores[i];
  }
  for (var i = 0; i < scores.length; i++) {
    probability = (total - scores[i]) / total;
    matingProbabilities.push(probability);
  }
  return matingProbabilities;
}

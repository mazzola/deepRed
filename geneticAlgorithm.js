jQuery.getScript('https://raw.github.com/mazzola/deepRed/master/gameState.js'); //Game State variables
jQuery.getScript('https://raw.github.com/mazzola/deepRed/master/utility.js'); //Utility functions


/*** Move Probability Distribution Functions (MPDFs) ***/
/* These are the functions that describe mario's actions through the
 * level. They are defined as a set of probabilities in the form of
 * {r, l, j, j', l', r'} where r is the probability that mario will go
 * righ, l is the probability that mario will go left, j is the
 * probability that mario will jump and r', l', and j' are the
 * probability that mario will release the respective keys.
 */

var MPDF_array = [];

function main() {
  // Randomly produce 4 MPDFs (global variables)
  
  // Begin Loop
  //  Tell the bot to run each MPDF 50 times

  //  Run the genetic algorithm on each set of 50
  //  to produce the new set of MPDF
  // End Loop
}


/**
 * Performs a genetic algorithm on 4 sets, each containing an array of 50 sequences.
 * Returns a new set of 4 MPDFs
 */
function geneticAlgorithm(sequence_set, population) {
  // Generate the scores for each sequence of moves
  sequenceScores = [];
  for (var i = 0; i < sequence_set.length; i++) {
    sequenceScores.push(fitness(sequence_set[i]));
  }
  matingProbability = matingProbability(sequenceScores);
  matingPairs = createMatingPairs(matingProbability, population);
  return mate(matingPairs);
}

DEATH = -1;
GAME_OVER = 2;

/**
 * Takes in an array of 50 move sequences and returns the average score
 * of the set of sequences.
 */
function fitness(sequence_array) {
  score = 0;
  for (var s = 0; s < sequence_array.length; s++) {
    sequence = sequence_array[s];
    for (var i = 0; i < sequence.length; i++) {
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
            i = sequence.length;
            break;
        }
        if (isMatch(move.pipe, pipe)) {
          score = score + 10;
        }
      }
    }
  }
  return score/sequence_array.length;
}

function matingProbability(scores) {
  matingProbabilities = [];
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

function createMatingPairs(matingProbability, population) {
  matingPairs[[]];
  for (var i = 0; i < matingProbability.length; i++) {
    pair = [];
    pair.push(selectIndexWithPropability(matingProbability, population));
    pair.push(selectIndexWithPropability(matingProbability, population));
    matingPairs.push(pair);
  }
  return matingPairs;
}

/*
 * Selects an index from 0..n based on a probability array
 * of size n
 */
function selectMDFWithPropability(matingProbability, population) {
  threshold = Math.random();
  index = 0;
  cursor = matingProbability[0];
  while (cursor < threshold) {
    index = index + 1;
    cursor = cursor + matingProbability[index]; 
  }
  return population[index];
}

function mate(matingPairs) {
  children = selectAndCrossover(matingPairs);
  return mutate(children);
}

function selectAndCrossover(matingPairs) {
  childrenPairs = [];
  for (var pair = 0; pair < matingPairs; pair++) {
    size = Object.keys(currentHuer).length;
    slice_index = Math.floor(Math.random() * size);
    parent1 = convertMPDFtoArray(pair[0]);
    parent2 = convertMPDFtoArray(pair[1]);
    // Create children values
    child1 = parent1.slice(0, slice_index).concat(parent2.slice(slice_index));
    child2 = parent2.slice(0, slice_index).concat(parent1.slice(slice_index));

  }
}

function mutate(population) {

}

function convertMPDFtoArray(mpdf) {
  array = [];
  for (key in mpdf) {
    array.push(mpdf[key]);
  }
  return array;
}

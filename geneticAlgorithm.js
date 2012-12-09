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
var genetic = true;
var roundSequence = [];
function startGenetic() {
	console.log("Starting Genetic");
	// Randomly produce 4 MPDFs (global variables)
	var temp = [];
	for (var i = 0; i < 4; i++){
		var mpdf = generateMPDF();
		printMPDF(mpdf);
		temp.push(mpdf);
	}
	MPDF_array.push(temp);
	// Begin Loop
	while(genetic){
		console.log("Main Genetic Loop");
		var pop = MPDF_array[MPDF_array.length-1];
		for (var i = 0; i < 4; i++){
			startNewGame(pop[i]);
			while(roundSequence.length == i){
				setTimeout("", 100000);
			}
		}
		//  Run the genetic algorithm on each set of 25
		var printNew = geneticAlgorithm(roundSequence,MPDF_array);
		for (var i = 0; i < printNew.length; i++){
			printMPDF(printNew[i]);
		}
		MPDF_array.push(printNew);
		roundSequence= [];
		//  to produce the new set of MPDF
	}
	// End Loop
}

function stopGenetic(){
	genetic = false;
}

/**
 * generates a MPDF
 */
function generateMPDF(){
	var array = [];
	var total = 1;
	while (array.length < 2){
		var ammount = Math.random();
		if (ammount < total){
			total = total - ammount;
			array.push(ammount);
		}
	}
	array.push(total);
	total = 1;
	while (array.length < 5){
		var ammount = Math.random();
		if (ammount < total){
			total = total - ammount;
			array.push(ammount);
		}
	}
	array.push(total);
	var temp= convertArraytoMPDF(array);
	return temp;
}


/**
 * Performs a genetic algorithm on 4 sets, each containing an array of 50 sequences.
 * Returns a new set of 4 MPDFs
 */
function geneticAlgorithm(sequence_set, population) {
	console.log("Starting Genetic algorithm calculations");
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
	console.log("Fittness");
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
	console.log("Mating Probabilites");
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
	console.log("Mating Pairs");
	matingPairs[[]];
	for (var i = 0; i < matingProbability.length/2; i++) {
		pair = [];
		pair.push(selectMPDFWithPropability(matingProbability, population));
		pair.push(selectMPDFWithPropability(matingProbability, population));
		matingPairs.push(pair);
	}
	return matingPairs;
}

/*
 * Selects an index from 0..n based on a probability array
 * of size n
 */
function selectMPDFWithPropability(matingProbability, population) {
	console.log("Select MPDF with probability");
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
	console.log("MATE");
	children = selectAndCrossover(matingPairs);
	return mutate(children);
}

function selectAndCrossover(matingPairs) {
	console.log("selectAndCrossOver");
	childrenPairs = [];
	for (var i = 0; i < matingPairs.length; i++) {
		pair = matingPair.shift();
		size = Object.keys(currentHuer).length;
		slice_index = Math.floor(Math.random() * size);
		parent1 = convertMPDFtoArray(pair[0]);
		parent2 = convertMPDFtoArray(pair[1]);
		// Create children values
		child1 = parent1.slice(0, slice_index).concat(parent2.slice(slice_index));
		child2 = parent2.slice(0, slice_index).concat(parent1.slice(slice_index));
		childrenPairs.push(child1);
		childrenPairs.push(child2);
	}
	return childrenPairs;
}

function mutate(population) {
	console.log("Mutate");
	var mutChance = .05;
	var mutatedPopulation =[];
	for (var i = 0; i < population.length; i++){
		var mpdf = population[i];
		var chance = Math.random();
		var mutIndex = Math.floor(Math.random()*mpdf.length);
		var mutAmount = Math.random()*15;
		var subAmount = mutAmount/(mpdf.length - 1);
		if (chance < mutChance){
			for (var j = 0; j < mpdf.length; j++){
				if (j == mutIndex){
					mpdf[j] = mpdf[j] + mutAmount;
				}else{
					mpdf[j] = mpdf[j] - subAmount;
				}
			}
		}
		mutatedPopulation.push(convertArraytoMPDF(mpdf));
	}
}

function convertMPDFtoArray(mpdf) {
	console.log("MPDF TO ARRAY");
	array = [];
	for (key in mpdf) {
		array.push(mpdf[key]);
	}
	return array;
}

function convertArraytoMPDF(array) {
	if (array.length == 6){
		return {right:array[0],left:array[1],jump:array[2], jumpUp:array[3], leftUp:array[4], rightUp:array[5]};
	}
	return null;
}

function printMPDF(mpdf){
	var str ="";
	for (key in mpdf) {
		str = str + ' ' + key + ': ' + mpdf[key];
	}
	console.log(str);
}

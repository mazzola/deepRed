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
	for (var i = 0; i < 8; i++){
		var mpdf = generateMPDF();
		printMPDF(mpdf);
		temp.push(mpdf);
	}
	MPDF_array.push(temp);
	// Begin Loop
	geneticHelper();
}

function geneticHelper(){
	if (genetic){
		console.log("Main Genetic Loop");
		var pop = MPDF_array[MPDF_array.length-1];
		currentIteration = 0;
		goodMoves = [];
		returnData = [];
		if (roundSequence.length < pop.length){
			printMPDF(pop[roundSequence.length]);
			startNewGame(pop[roundSequence.length]);
		}else{
			//  Run the genetic algorithm on each set of 25
			var printNew = geneticAlgorithm(roundSequence,pop);
			for (var i = 0; i < printNew.length; i++){
				printMPDF(printNew[i]);
			}
			MPDF_array.push(printNew);
			roundSequence= [];
			geneticHelper();
		}
	}
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
	var sequenceScores = [];
	for (var i = 0; i < sequence_set.length; i++) {
		sequenceScores.push(fitness(sequence_set[i]));
	}
	console.log(sequenceScores.length);
	var matingProb = matingProbability(sequenceScores);
	var matingPairs = createMatingPairs(matingProb, population);
	return mate(matingPairs);
}

DEATH = -1;
GAME_OVER = 2;
WIN = -2;

/**
 * Takes in an array of 50 move sequences and returns the average score
 * of the set of sequences.
 */
function fitness(sequence_array) {
	console.log("Fittness");
	var score = 1000000000;
	var wins = 0;
	for (var s = 0; s < sequence_array.length; s++) {
		sequence = sequence_array[s];
		for (var i = 2; i < sequence.length; i++) {
			var move = sequence[i];
			if (move != null) {
				switch(move.move){
				case DEATH:
					score = score + 100000;
					break;
				case GAME_OVER:
					score = score + 1000000;
					i = sequence.length;
					break;
				case WIN:
					score = score - 1000000000;
					wins = wins + 1;
					break;
				}
				if (move != null && sequence[i-2] != null && isMatch(move.pipeCheck, sequence[i-2].pipeCheck)) {
					score = score + 10;
				}
				if (!isMatch(move.pipeCheck, sequence[i-2].pipeCheck)) {
					score = score - 50;
				}
			}
		}
	}
	console.log("AVE SCORE " + score + " sWINS " + wins);
	return score/sequence_array.length;
}

function matingProbability(scores) {
	console.log("Mating Probabilites");
	var matingProbabilities = [];
	var total = 0;
	for (var i = 0; i < scores.length; i++) {
		total = total + scores[i];
	}
	for (var i = 0; i < scores.length; i++) { 
		var probability = (total - scores[i]) / total;
		matingProbabilities.push(probability);
	}
	total = 0;
	for (var i = 0; i < scores.length; i++) {
		total = total + matingProbabilities[i];
	}
	for (var i = 0; i < scores.length; i++) { 
		var probability = (matingProbabilities[i]) / total;
		matingProbabilities[i] =(probability);
	}
	return matingProbabilities;
}

function createMatingPairs(matingProb, population) {
	console.log("Mating Pairs");
	var matingPairs=[];
	for (var i = 0; i < matingProb.length/2; i++) {
		var pair = [];
		pair.push(selectMPDFWithPropability(matingProb, population));
		pair.push(selectMPDFWithPropability(matingProb, population));
		matingPairs.push(pair);
	}
	return matingPairs;
}

/*
 * Selects an index from 0..n based on a probability array
 * of size n
 */
function selectMPDFWithPropability(matingProb, population) {
	console.log("Select MPDF with probability");
	var threshold = Math.random();
	var index = 0;
	var cursor = matingProb[0];
	while (cursor < threshold) {
		index = index + 1;
		cursor = cursor + matingProb[index]; 
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
	var childrenPairs = [];
	for (var i = 0; i < matingPairs.length; i++) {
		var pair = matingPairs[i];
		var size = Object.keys(currentHuer).length;
		var slice_index1 = Math.floor(Math.random() * size/2);
		var slice_index2 = Math.floor(Math.random() * size/2 + size/2);
		console.log("indexs : "+slice_index1 + " i2: " + slice_index2);
		var parent1 = convertMPDFtoArray(pair[0]);
		var parent2 = convertMPDFtoArray(pair[1]);
		// Create children values
		var child1 = parent1.slice(0, slice_index1).concat(parent2.slice(slice_index1, size/2)).concat(parent1.slice(size/2 , slice_index2)).concat(parent2.slice(slice_index2));
		var child2 = parent2.slice(0, slice_index1).concat(parent1.slice(slice_index1, size/2)).concat(parent2.slice(size/2 , slice_index2)).concat(parent1.slice(slice_index2));
		childrenPairs.push(child1);
		childrenPairs.push(child2);
	}
	return childrenPairs;
}

function mutate(population) {
	console.log("Mutate");
	var mutChance = .01;
	var mutatedPopulation =[];
	for (var i = 0; i < population.length; i++){
		var mpdf = population[i];
		var least1 = 1;
		for (var j = 0; j < mpdf.length/2; j++){
			if (least1 > mpdf[j]){
				least1 = mpdf[j];
			}
		}
		var least2 = 1;
		for (var j = 3; j < mpdf.length; j++){
			if (least2 > mpdf[j]){
				least2 = mpdf[j];
			}
		}
		var chance1 = Math.random();
		var chance2 = Math.random();
		var mutIndex1 = Math.floor(Math.random()*mpdf.length/2);
		var mutIndex2 = Math.floor(Math.random()*mpdf.length/2);
		var mutAmount1 = Math.random()*least1;
		var mutAmount2 = Math.random()*least2;
		var subAmount1 = mutAmount1/(mpdf.length/2 - 1);
		var subAmount2 = mutAmount2/(mpdf.length/2 - 1);
		if (chance1 < mutChance){
			colsole.log("MUTATION1");
			for (var j = 0; j < mpdf.length/2; j++){
				if (j == mutIndex1){
					mpdf[j] = mpdf[j] + mutAmount1;
				}else{
					mpdf[j] = mpdf[j] - subAmount1;
				}
			}
		}
		if (chance2 < mutChance){
			console.log("MUTATION2");
			for (var j = 3; j < mpdf.length; j++){
				if (j == mutIndex2){
					mpdf[j] = mpdf[j] + mutAmount2;
				}else{
					mpdf[j] = mpdf[j] - subAmount2;
				}
			}
		}
		mutatedPopulation.push(convertArraytoMPDF(mpdf));
	}
	return mutatedPopulation;
}

function convertMPDFtoArray(mpdf) {
	console.log("MPDF TO ARRAY");
	var array = [];
	for (key in mpdf) {
		array.push(mpdf[key]);
	}
	return array;
}

function convertArraytoMPDF(array) {
	var total =0;
	for (var i = 0; i < 3; i++){
		total = total + array[i];
	}
	for (var i = 0; i < 3; i++){
		array[i] = array[i]/total;
	}
	total =0;
	for (var i = 3; i < 6; i++){
		total = total + array[i];
	}
	for (var i = 3; i < 6; i++){
		array[i] = array[i]/total;
	}
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

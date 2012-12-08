/** Line of code which injects javascript to JSNES to play mario at
 * http://fir.sh/projects/jsnes/ 
 * $.getScript('https://raw.github.com/mazzola/deepRed/master/injection.js') */

/* INCLUDES */
jQuery.getScript('https://raw.github.com/mazzola/deepRed/master/gameState.js'); //Game State variables
jQuery.getScript('https://raw.github.com/mazzola/deepRed/master/utility.js'); //Utility functions
jQuery.getScript('https://raw.github.com/mazzola/deepRed/master/AI.js'); //AI
jQuery.getScript('https://raw.github.com/mazzola/deepRed/master/replay.js'); //replay
jQuery.getScript('https://raw.github.com/mazzola/deepRed/master/winner.js'); //winner

/** 
 * Create an interval timer that should never go off
 * Used later to see if the ai should stop firing key presses
 */
sendKey = setTimeout("", 1000000000000);

/**
 * MAIN METHOD
 * Clears the timeout interval so it can be used to incrementally fire moves
 */
var run = true;
function main(){
	console.log("Start main loop");
	allUp();
	if(run){
		replay(goodMoves);
	}
}

/**
 * STOP
 * stops the ai loop
 * @returns
 */
function stop(){
	allUp();
	clearTimeout(sendKey);
	run = false;
}

//runs the ai checking for current game state
function runAI(){
	console.log("run AI");
	//is a game over 
	if (isGameOver()){
		console.log("Game Over");
		movesMade.push(new Move(-1, false));
		getGoodMoves(movesMade);
		allUp();
		score();
		//add new moves array to movesMade and increment index
		sendKey = setTimeout("startNewGame()",500);
	}else{
		if (isLevel1()){
			console.log("You died");
			var last = movesMade.length-1;
			var elem = movesMade[last];
			allUp();
			if( elem == null || elem.move != -1){
				movesMade.push(new Move(-1, false));
			}
			allUp();
			sendKey = setTimeout("runAI()", 4000);
		}else if (isLevel2()){
			console.log("YOU WIN!");
			movesMade.push(new Move(-2, false));
			clearInterval(sendKey);
			score();
			console.log('done');
			sendKey = setTimeout("runAI()", 4000);
		}else if (!isDiffTime()){
			console.log('Same Time!!!');
			sendKey = setTimeout("runAI()", 200);
		}else{
			//With probabilty for the hueristic function see if one of the keys is released
			makeMove(allMoves.shift());
			//makes a random move
			makeMove(allMoves.shift());
			sendKey = setTimeout("runAI()", 200);
		}
	}
}

//Called after game over has been reached.  Presses enter 10 times or until the first level hase been seen then calls main
function startNewGame(){
	//if on level one start the main method after five seconds
	if (isLevel1()){
		console.log("New Game!");
		movesMade = [];
		allUp();
		getMoves(24000);
		sendKey = setTimeout("main()", 4000);
	}else{
		//press enter then release enter
		Podium.keydown(13); 
		setTimeout("Podium.keyup(13)",200);
		setTimeout("startNewGame()", 250);
	}	
}

/**
 * Function that sequence of moves from the longest life
 */
function getGoodMoves(array){
	var temp = [[]];
	var whichArray = 0;
	var max = [];
	for(var i = 0; i < array.length; i++){
		if (array[i] != null && array[i].move == -2){
			i = array.length;
		}
		if(array[i] == null || array[i].move != -1){
			temp[whichArray].push(array[i]);
		}
		else{
			console.log("goodMoves next " + i);
			whichArray++;
			temp.push([]);
		}
	}
	max = temp[0];
	for (var i = 1; i < temp.length; i++){
		console.log("Max length : " + max.length + " Temp length: " + temp[i].length);
		if (max.length < temp[i].length){
			max = temp[i];
		}
	}
	goodMoves= max;
}

/**
 * function that generates n moves 
 **/
function getMoves(n){
	for (var i = 0; i < n; i++){
		allMoves.push(genMove());
		allMoves.push(genUp());
	}
}
/* ENVIORNMENT */

debug = false;
/** Data Arrays for level data 'status' screens
 * Used to determine if mario has completed the level, died or gotten gameover
 */
//Mean mario has died
lvl1 = [0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255];

//Mario has completed the first level
lvl2 = [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255];

//Mario has gotten a game over
gameOver = [0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255];

//Mario is running into a pipe
pipe = [117, 227, 0, 255, 117, 227, 0, 255, 0, 171, 0, 255, 117, 227, 0, 255, 117, 227, 0, 255, 0, 171, 0, 255, 117, 227, 0, 255, 117, 227, 0, 255, 0, 171, 0, 255];


/* KEY PRESSES */
/** 
 * Possible moves that can be made and booleans that state if the key is currently being pressed
 */
KEY_LEFT = 37;
KEY_RIGHT = 39;
KEY_JUMP = 88;
moves = [KEY_LEFT,KEY_RIGHT,KEY_JUMP];
down_left = false; //left arrow
down_right = false; //right arrow 
down_jump = false; //'x' jump
prevTime = [];
numTime = 0;
iterations = 20;
currentIteration = 0;
fitnessCount = 4;

//Array that stores arrays of moves that have been made
movesMade = [];
returnData=[];

/* 
 * Function that checks to see if a game over screen has been reached
 */
function isGameOver(){
	return isMatch(gameOver, jQuery('.nes-screen')[0].getContext('2d').getImageData(88,129,6,6).data);
}
/* 
 * Function that checks to see if mario has died
 */
function isLevel1(){
	return isMatch(lvl1, jQuery('.nes-screen')[0].getContext('2d').getImageData(153,80,6,6).data);
}
/* 
 * Function that checks to see if mario has completed the first stage
 */
function isLevel2(){
	return isMatch(lvl2, jQuery('.nes-screen')[0].getContext('2d').getImageData(153,80,6,6).data);
}

function isDiffTime(){
	var now = jQuery('.nes-screen')[0].getContext('2d').getImageData(224,22,7,8).data;
	if (!isMatch(prevTime, now)){
		prevTime = now;
		numTime = 0;
		return true;
	}else{
		numTime = numTime + 1;
		return numTime < 6;
	}
}

/*
 * Function that checks infront of mario for a pipe
 */
function isPipe(){
	return isMatch(pipe, getPipe());
}

/**
 * function that gets the a sqaure of pixels infront of mario
 **/
function getPipe(){
	return jQuery('.nes-screen')[0].getContext('2d').getImageData(0,40,214,1).data;
}

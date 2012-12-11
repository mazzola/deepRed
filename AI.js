//An array of the last good moves
goodMoves = [];
allMoves = [];


/**
 * Huersitic Data
 */
currentHuer = {right:.60,left:.001,jump:.399, jumpUp: .0025, leftUp: .995, rightUp: .0025};
//where the hueristics, their final move sequence and score will be saved
saveHuer = [];


/**
 * Function that generates a move using the current hueristic function
 */
function genMove(){
	var value = Math.random();
	var right = currentHuer.right;
	var left = right + currentHuer.left;
	if (value < right){
		move= KEY_RIGHT;
	}else if (value < left){
		move= KEY_LEFT;
	}else{
		move= KEY_JUMP;
	}
	return new Move(move,true, null);
}

/**Function that uses the heursitic to determine if a key up event should be fired
 * 
 */
function genUp(){
	//chooses a random value
	var value = Math.random();
	//interperts the directions which value corresponds to
	var right = currentHuer.rightUp;
	var left = right + currentHuer.leftUp;
	if (value < right){
		move = KEY_RIGHT;
	}else if (value < left){
		move = KEY_LEFT;
	}else{
		move = KEY_JUMP;
	}
	return new Move(move, false,null);

}

/**
 * Function that currently applies a move generated using the current hueristic function
 */
function makeMove(move){
	//picks a move using the hueristic function as a base
	if (move == null || move.move == 0) movesMade.push(new Move(0,false,getPipe()));
	else{
		switch(move.move){
		//left arrow
		case KEY_LEFT:
			//If it is being pressed fire a keyup with some probability
			if (down_left && !move.dir){
				down_left = false;
				movesMade.push(new Move(KEY_LEFT, false, getPipe()));
				Podium.keyup(KEY_LEFT); 
				break;
			}//if it is not being pressed fire a keydown
			else if(!down_left && move.dir){ 
				down_left = true;
				movesMade.push(new Move(KEY_LEFT, true, getPipe()));
				Podium.keyup(KEY_LEFT); 
				Podium.keydown(KEY_LEFT); 
				break;
			}
			else{
				movesMade.push(new Move(0,false,getPipe()));
			}
			//Right arrow
		case KEY_RIGHT:
			//If it is being pressed fire a keyup
			if (down_right && !move.dir){
				down_right = false;
				movesMade.push(new Move(KEY_RIGHT, false, getPipe()));
				Podium.keyup(KEY_RIGHT); 
				break;
			}
			//If it is not being pressed fire a keydown
			else if (!down_right && move.dir){
				down_right = true;
				movesMade.push(new Move(KEY_RIGHT, true, getPipe()));
				Podium.keydown(KEY_RIGHT); 
				break;
			}
			else{
				movesMade.push(new Move(0,false,getPipe()));
			}
			//Jump key (x)
		case KEY_JUMP:
			//If it is being pressed fire a keyup
			if (down_jump && !move.dir){
				down_jump = false;
				movesMade.push(new Move(KEY_JUMP, false, getPipe()));
				Podium.keyup(KEY_JUMP); 
				break;
			}//If it is not being pressed fire a keydown
			else if (!down_jump & move.dir){
				down_jump = true;
				movesMade.push(new Move(KEY_JUMP, true, getPipe()));
				Podium.keydown(KEY_JUMP); 
				break;
			}
			else{
				movesMade.push(new Move(0,false,getPipe()));
			}
		}
	}
	var move = movesMade.pop();
	movesMade.push(move);
	if(debug){
		console.log(printMove(move));
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
	goodMoves= max.slice(0, 1000);
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
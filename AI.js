//An array of the last good moves
goodMoves = [];


/**
 * Huersitic Data
 */
currentHuer = {right:.89,left:.01,jump:.10, jumpUp: .0025, leftUp: .995, rightUp: .0025};
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
		return 39;
	}else if (value < left){
		return 37;
	}else{
		return 88;
	}
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
		move = 39;
	}else if (value < left){
		move = 37;
	}else{
		move = 88;
	}
	switch(move){
	//left arrow
	case 37:
		//If it is being pressed fire a keyup
		if (down37){
			makeMove(37);
			break;
		}
		else{
			makeMove(null);
			break;
		}
		//Right arrow
	case 39:
		//If it is being pressed fire a keyup
		if (down39){
			makeMove(39);
			break;
		}
		else{
			makeMove(null);
			break;
		}
		//Jump key (x)
	case 88:
		//If it is being pressed fire a keyup
		if (down88){
			makeMove(88);
			break;
		}
		else{
			makeMove(null);
			break;
		}
	}

}

/**
 * Function that currently applies a move generated using the current hueristic function
 */
function makeMove(move){
	//picks a move using the hueristic function as a base
	if (move == null) movesMade.push(move);
	else{
		switch(move){
		//left arrow
		case 37:
			//If it is being pressed fire a keyup with some probability
			if (down37){
				down37 = false;
				movesMade.push(new Move(37, false, pipe));
				Podium.keyup(37); 
				break;
			}//if it is not being pressed fire a keydown
			else{ 
				down37 = true;
				movesMade.push(new Move(37, true, pipe));
				Podium.keyup(37); 
				Podium.keydown(37); 
				break;
			}
			//Right arrow
		case 39:
			//If it is being pressed fire a keyup
			if (down39){
				down39 = false;
				movesMade.push(new Move(39, false, pipe));
				Podium.keyup(39); 
				break;
			}
			//If it is not being pressed fire a keydown
			else{
				down39 = true;
				movesMade.push(new Move(39, true, pipe));
				Podium.keydown(39); 
				break;
			}
			//Jump key (x)
		case 88:
			//If it is being pressed fire a keyup
			if (down88){
				down88 = false;
				movesMade.push(new Move(88, false, pipe));
				Podium.keyup(88); 
				break;
			}//If it is not being pressed fire a keydown
			else{
				down88 = true;
				movesMade.push(new Move(88, true, pipe));
				Podium.keydown(88); 
				break;
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
 * function that scores the current huersitic against the master the lower the score the better
 */
function score(){
	var score = 0;
	var array = movesMade;
	for(var i = 0; i < array.length; i++){
		var temp = array[i];
		if (temp != null){
			switch(temp.move){
			case 37:
				score = score + 10;
				break;
			case 39:
				score = score + 1;
				break;
			case 88:
				score = score + 2;
				break;
			case -1:
				score = score + 100000;
				break;
			case -2:
				i = array.length;
				break;
			}
		}
	}
	saveHuer.push({moves:array, huer:currentHuer, score:score});
}

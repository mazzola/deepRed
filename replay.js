/** File that given an array can replay it
 * https://dl.dropbox.com/u/23547570/deepRed/replay.js
 * **/

//test
//replayMoves = [(null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,true,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(88,false,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,true,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(88,false,null)), (new Move(39,false,null)), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(88,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,true,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (new Move(88,false,null)), (new Move(88,true,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,true,null)), (null), (new Move(39,true,null)), (new Move(88,false,null)), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (new Move(39,false,null)), (new Move(88,true,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(88,false,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(88,true,null)), (new Move(39,false,null)), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,false,null)), (null), (new Move(39,true,null))];
replayTimeout = setTimeout("", 10000000000);
//function that replays
function replay(m){
	allUp();
	if(typeof(m) !== 'undefined'){
		replayMoves = m;
	}
	stopReplay();
	replayMove();
}
var delay = 0;
function replayMove(){
	delay = delay + 1;
	if (replayMoves.length <= 24){
		console.log("replay done");
		clearInterval(sendKey);
		setTimeout("runAI()", 200);
	}else{
		if (isLevel1()){
			console.log("level1");
			runAI();
		}else{
			move1 = replayMoves.shift();
			move2 = replayMoves.shift();
			if (move1 != null){
				makeMove(move1.move);
			}else{
				makeMove(null);
			}
			if (move2 != null){
				makeMove(move2.move);
			}else{
				makeMove(null);
			}
			replyTimeout = setTimeout('replayMove()', 200 + delay/100);
		}
	}
}
function replayMove2(){
	console.log("replay 2");
	//is a game over 
	if (isGameOver()){
		console.log("Game Over");
		movesMade.push(new Move(-1, false));
		getGoodMoves(movesMade);
		allUp();
		score();
		//add new moves array to movesMade and increment index
		sendKey = setTimeout("startNewGame()",500);
	}else if (replayMoves.length <= 58){
		runAI();
	}
	else{
		if (isLevel1()){
			console.log("You died");
			var last = movesMade.length-1;
			var elem = movesMade[last];
			allUp();
			if( elem.move != -1){
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
		}else{
			move1 = replayMoves.shift();
			move2 = replayMoves.shift();
			if (move1 != null){
				makeMove(move1.move);
			}else{
				makeMove(null);
			}
			if (move2 != null){
				makeMove(move2.move);
			}else{
				makeMove(null);
			}
			replayTimeout = setTimeout("replayMove2()", 200);
		}
	}
}


function stopReplay(){
	clearTimeout(replayTimeout);
}
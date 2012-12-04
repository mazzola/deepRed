/** File that given an array can replay it
 * https://dl.dropbox.com/u/23547570/deepRed/replay.js
 * **/

//test
//replayMoves = [(null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_JUMP,true,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_JUMP,false,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_JUMP,true,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_JUMP,false,null)), (new Move(KEY_RIGHT,false,null)), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_JUMP,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_JUMP,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_JUMP,true,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (new Move(KEY_JUMP,false,null)), (new Move(KEY_JUMP,true,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_JUMP,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_JUMP,true,null)), (null), (new Move(KEY_RIGHT,true,null)), (new Move(KEY_JUMP,false,null)), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (new Move(KEY_RIGHT,false,null)), (new Move(KEY_JUMP,true,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_JUMP,false,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_JUMP,true,null)), (new Move(KEY_RIGHT,false,null)), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_RIGHT,true,null)), (null), (new Move(KEY_RIGHT,false,null)), (null), (new Move(KEY_JUMP,false,null)), (null), (new Move(KEY_RIGHT,true,null))];
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

function replayMove(){
	if (replayMoves.length <= 68){
		console.log("replay done");
		clearInterval(sendKey);
		sendKey = setTimeout('runAI()', 200);
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
		replyTimeout = setTimeout('replayMove()', 200);
	}
}

function stopReplay(){
	clearTimeout(replayTimeout);
}

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
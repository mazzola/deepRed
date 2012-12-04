/** File that given an array can replay it
 * https://dl.dropbox.com/u/23547570/deepRed/replay.js
 * **/

//test
//replayMoves = [(null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,true,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(88,false,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,true,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(88,false,null)), (new Move(39,false,null)), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(88,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,true,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (new Move(88,false,null)), (new Move(88,true,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,true,null)), (null), (new Move(39,true,null)), (new Move(88,false,null)), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (new Move(39,false,null)), (new Move(88,true,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(88,false,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(88,true,null)), (new Move(39,false,null)), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(39,true,null)), (null), (new Move(39,false,null)), (null), (new Move(88,false,null)), (null), (new Move(39,true,null))];
//function that replays
function replay(m){
	allUp();
	if(typeof(m) !== 'undefined'){
		replayMoves = m;
	}
	stopReplay();
	replayMove(0);
}

function replayMove(count){
	var limit = replayMoves.length - 68;
	if (count >= limit || isLevel1()){
		console.log("replay done");
		clearInterval(sendKey);
		sendKey= setTimeout("runAI()", 10);
	}else{
		move1 = replayMoves[count];
		move2 = replayMoves[count+1];
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
		sendKey = setTimeout(function(){replayMove(count+2);}, 200);
	}
}

function stopReplay(){
	clearTimeout(replayTimeout);
}

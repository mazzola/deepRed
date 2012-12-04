/** function used to compare two arrays to see if they are the same
 * will stop as soon as mismatch between elements is found
 * @param data1 : first array (looped over)
 * @param data2 : second array (compared to)
 * @returns {Boolean}
 */
function isMatch(data1,data2){
	for(var i = 0; i<data1.length; i++){
		if(data1[i] != data2[i]) return false;
	}
	return true;
};


/**
 * Class that represents a move
 * @param move : key code for key event being fired
 * @param dir : true if key is being pressed false if it is being released
 * @returns
 */
function Move (move, dir, pipe) {
	this.move = move;
	this.dir = dir;
	this.pipeCheck = pipe;
}


//Function the loops through the movesMade array and prints them to the console
function printMoves(){
	str = "";
	for (var j = 0; j < movesMade.length; j++){
		for (var i = 0; i < movesMade[j].length; i++){
			str = str + "Move : " + movesMade[j][i].move + " Direction : " + movesMade[j][i].dir + "\n";
		}
	}
	return str;
}


/**How the keyfire events are generated
 * only key up and keydown work
 * code based on 
 * http://stackoverflow.com/questions/10455626/keydown-simulation-in-chrome-fires-normally-but-not-the-correct-key
 */
Podium = {};
//Where key down is defined
Podium.keydown = function(k) {
	var oEvent = document.createEvent('KeyboardEvent');

	// Chromium Hack
	Object.defineProperty(oEvent, 'keyCode', {
		get : function() {
			return this.keyCodeVal;
		}
	});     
	Object.defineProperty(oEvent, 'which', {
		get : function() {
			return this.keyCodeVal;
		}
	});     

	if (oEvent.initKeyboardEvent) {
		oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
	} else {
		oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
	}

	oEvent.keyCodeVal = k;

	if (oEvent.keyCode !== k) {
		alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
	}

	document.dispatchEvent(oEvent);
};
//Where keyup is defined
Podium.keyup = function(k) {
	var oEvent = document.createEvent('KeyboardEvent');

	// Chromium Hack
	Object.defineProperty(oEvent, 'keyCode', {
		get : function() {
			return this.keyCodeVal;
		}
	});     
	Object.defineProperty(oEvent, 'which', {
		get : function() {
			return this.keyCodeVal;
		}
	});     

	if (oEvent.initKeyboardEvent) {
		oEvent.initKeyboardEvent("keyup", true, true, document.defaultView, false, false, false, false, k, k);
	} else {
		oEvent.initKeyEvent("keyup", true, true, document.defaultView, false, false, false, false, k, 0);
	}

	oEvent.keyCodeVal = k;

	if (oEvent.keyCode !== k) {
		alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
	}

	document.dispatchEvent(oEvent);
};

//Function that prints the move as a string.
function printMove(move){
	if (move == null){
		return "Null";
	}else{
		return "Move: " + move.move + "Direction: " + move.dir;
	}
}

//prints an array of moves as a string
function toStr(data){
	var str = "";
	for(var i = 0; i<data.length; i++){
		if (data[i] ==null){
			str = str + "(null), ";
		}else{
			str = str + "(new Move(" + data[i].move + "," + data[i].dir+ ",null)), ";
		}
	}
	return str;
}

//makes sure all keypress are up
function allUp(){
	Podium.keyup(88);
	Podium.keyup(37);
	Podium.keyup(39);
	down37 = false; //left arrow
	down39 = false; //right arrow 
	down88 = false; //jump
}
import move from "src/controllers/move.js";
import piece from "src/controllers/piece.js";
import square from "src/controllers/square.js";
import turn from "src/controllers/turn.js";
import state from "src/controllers/state.js";
//import importservice from "src/controllers/importservice.js";
//import exportservice from "src/controllers/exportservice.js";

class Checkers {
   #piecesWhite;
	#piecesBlack;
	#turn;
	#kingMoves;
	#piecesSquarePairingBlack;
	#piecesSquarePairingWhite;
    
    constructor() {
	this.#piecesWhite = 20;
	this.#piecesBlack = 20;
	this.#turn = "white";
	this.#kingMoves = 25;
	this.#piecesSquarePairingBlack = new Map((function () {
			let pairing = [];
			let pieceId = 1;
			let squareId = 2;
			let onNextLine = 1;
			for (let i = 0; i <= 3; i = i + 1) {
				for (let j = 0; j <= 4; j = j + 1) {
					pairing.push([pieceId, [squareId ,0 ]]);
					pieceId = pieceId + 1;
                    if (j === 4) {
                        squareId = squareId + onNextLine;
                    } else {
    					squareId = squareId + 2;
                    }
				}
				if (onNextLine === 1) {
					onNextLine = 3;
				} else if (onNextLine === 3) {
                    onNextLine = 1;
                }
			}
			return pairing;
		})()
	);
	this.#piecesSquarePairingWhite = new Map((function () {
			let pairing = [];
			let pieceId = 21;
			let squareId = 62;
			let onNextLine = 1;
			for (let i = 0; i <= 3; i = i + 1) {
				for (let j = 0; j <= 4; j = j + 1) {
					pairing.push([pieceId, [squareId ,0 ]]);
					pieceId = pieceId + 1;
                    if (j === 4) {
                        squareId = squareId + onNextLine;
                    } else {
    					squareId = squareId + 2;
                    }
				}
				if (onNextLine === 1) {
					onNextLine = 3;
				} else if (onNextLine === 3) {
                    onNextLine = 1;
                }
			}
			return pairing;
		})()
	);
    }

	get piecesBlack () {
		return this.#piecesBlack;
	}
	
	set piecesBlack (n) {
		if (n === -1) {
			this.#piecesBlack = this.#piecesBlack + n;
		}
	}
	
	get piecesWhite () {
		return this.#piecesWhite;
	}
	
	set piecesWhite (n) {
		if (n === -1) {
			this.#piecesWhite = this.#piecesWhite + n;
		}
	}
	
	get turn () {
		return this.#turn;
	}
	
	set turn (n) {
		if (this.#turn === "white" && n === "black") {
			this.#turn = "black";
		} else if (this.#turn === "black" && n === "white") {
			this.#turn = "white";
		} 
	}

	get kingMoves () {
		return this.#kingMoves;
	}
	
	set kingMoves (n) {
		if (n === -1) {
			this.#kingMoves = this.#kingMoves + n;
		}
	}

	getPiecesSquarePairingBlack (pieceId) {
		return this.#piecesSquarePairingBlack.get(pieceId);
	}
	
	setPieceBlackKing (pieceId) {
		if (pieceId > 0 && pieceId < 21) {
			let pieceArray = this.#piecesSquarePairingBlack.get(pieceId);
			if (pieceArray[1] === 0) {
				pieceArray[1] = 1;
				this.#piecesSquarePairingBlack.set(pieceId, pieceArray);
			}
		}
	}
	
	setPieceBlackSquare (pieceId, squareId) {
		if ((pieceId > 0 && pieceId < 21) && (squareId > 0 && squareId < 100)) {
			let pieceArray = this.#piecesSquarePairingBlack.get(pieceId);
			pieceArray[0] = squareId;
			this.#piecesSquarePairingBlack.set(pieceId, pieceArray);
		}
	}
	
	
	getPiecesSquarePairingWhite (pieceId) {
		return this.#piecesSquarePairingWhite.get(pieceId);
	}
	
	setPieceWhiteKing (pieceId) {
		if (pieceId > 20 && pieceId < 41) {
			let pieceArray = this.#piecesSquarePairingWhite.get(pieceId);
			if (pieceArray[1] === 0) {
				pieceArray[1] = 1;
				this.#piecesSquarePairingWhite.set(pieceId, pieceArray);
			}
		}
	}
	
	setPieceWhiteSquare (pieceId, squareId) {
		if ((pieceId > 20 && pieceId < 41) && (squareId > 0 && squareId < 100)) {
			let pieceArray = this.#piecesSquarePairingWhite.get(pieceId);
			pieceArray[0] = squareId;
			this.#piecesSquarePairingWhite.set(pieceId, pieceArray);
		}
	}

	removePiece (pieceId) {
		if (pieceId < 21) {
				let pieceArray = this.#piecesSquarePairingBlack.get(pieceId);
				pieceArray[0] = 0;
				this.#piecesSquarePairingBlack.set(pieceId, pieceArray);
		} else if (pieceId < 41) {
				let pieceArray = this.#piecesSquarePairingWhite.get(pieceId);
				pieceArray[0] = 0;
				this.#piecesSquarePairingWhite.set(pieceId, pieceArray);
			}
	}

//Piece
piece (pieceId) {
	if (pieceId < 21) {
		var pairing = getPiecesSquarePairingBlack(pieceId);
		var position = pairing[0];
		var color = "black";
	} else if (pieceId < 41) {
		var pairing = getPiecesSquarePairingWhite(pieceId);
		var position = pairing[0];
		var color = "white";
		}

	function occupies(pieceId) {
		return position;
	}

	function hasMoves(pieceId) {
		var pairing = getPiecesSquarePairingBlack(pieceId);
		if (pairing[1] === 0){ //man
			var a = [];
			var b = [[-11, -22],[-9, -18],[9, 18],[11, 22]];
			for (let i = 0; i <= 11; i = i + 1) [
				for () {
					
				}
			]

			if (0 === square.occupantId(pairing[0]-11) ||
				 0 === square.occupantId(pairing[0]-9) ||
				 0 === square.occupantId(pairing[0]+9) ||
				 0 === square.occupantId(pairing[0]+11) ) {
				return true; //has move(s)
			} else {
				if (0 === square.occupantType(pairing[0]-11) ||
				 0 === square.occupantType(pairing[0]-9) ||
				 0 === square.occupantType(pairing[0]+9) ||
				 0 === square.occupantType(pairing[0]+11) ) {
				 
				 }
				return false; //doesn't have move(s)
			}
		} else { //king
			
		}
    }
	

}

move (squareId01, squareId02) {
	if (square.occupantType(squareId01) === manBlack) {
		var pairing = getPiecesSquarePairingBlack(squareId01);
		if ((pairing[0] + 9) === squareId02) {
			if (square.occupantType(squareId02) === "none") {
				setPieceBlackSquare(square.occupantId(squareId01), squareId02);
			}
		} else if ((pairing[0] + 11) === squareId02) {
			if (square.occupantType(squareId02) === "none") {
				setPieceBlackSquare(square.occupantId(squareId01), squareId02);
			}
		}
	} else if (square.occupantType(squareId01) === manWhite) {
		var pairing = getPiecesSquarePairingWhite(squareId01);
		if ((pairing[0] + 9) === squareId02) {
			if (square.occupantType(squareId02) === "none") {
				setPieceWhiteSquare(square.occupantId(squareId01), squareId02);
			}
		} else if ((pairing[0] + 11) === squareId02) {
			if (square.occupantType(squareId02) === "none") {
				setPieceWhiteSquare(square.occupantId(squareId01), squareId02);
			}
		}
	}
}

playing () {
	function hasMoves() {
		var has = false;
		var pieceId;
		var n;
	
		if (turn === white) {
			pieceId = 21;
			n = 41;
		} else (
			pieceId = 1;
			n = 21;
		)
	
		for (pieceId; pieceId < n; pieceId++) {
			if (piece.hasMoves(pieceId) === true) {
				has = true;
			}
		}
	
		if (has === false) {
			return false;
		} else {
			return true;
		}
		}

		return turn;
	}

square (squareId) {
	function occupantId(squareId) {
		for (let i = 0; i <= 39; i = i + 1) {
			var pairing1 = getPiecesSquarePairingBlack(i);
			var pairing2 = getPiecesSquarePairingWhite(i);
			if (squareId === pairing1[0]) {
				return i;
			}
			if (squareId === pairing2[0]) {
				return i;
			}
		}
		return 0;
	}
	
	function occupantType(squareId) {
		var pairingBlack;
		var pairingWhite;
		for (let i = 0; i <= 39; i = i + 1) {
			vpairingBlack = getPiecesSquarePairingBlack(i);
			pairingWhite = getPiecesSquarePairingWhite(i);
			if (squareId === pairingBlack[0]) {
				if (pairingBlack[1] === 1) {
					return kingBlack;
				} else {
					return manBlack;
				}
			}
			if (squareId === pairingWhite[0]) {
			if (pairingWhite[1] === 1) {
					return kingWhite;
				} else {
					return manWhite;
				}
			}
		}
		return "none";
	}
}

state () {
	if (piecesWhite === 0) {
		return winBlack;
	} else if (piecesBlack=== 0) {
		return winWhite;
	} else if (playing.hasMoves() === false) {
		if (turn --- "black") {
			return winWhite;
		} else {
			return winBlack;
		}
	} else if (kingMoves === 0) {
		return draw;
	} else {
		return ongoing;
	}
}
}










































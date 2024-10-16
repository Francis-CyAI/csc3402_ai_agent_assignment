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

    /**
	constructor() {
		
	}
    */

	get piecesBlack () {
		return this.#piecesBlack;
	}
	
	set piecesBlack (value) {
		if (value === -1) {
			this.#piecesBlack = this.#piecesBlack + value;
		}
	}
	
	get piecesWhite () {
		return this.#piecesWhite;
	}
	
	set piecesWhite (value) {
		if (value === -1) {
			this.#piecesWhite = this.#piecesWhite + value;
		}
	}
	
	get turn () {
		return this.#turn;
	}
	
	set turn (value) {
		if (this.#turn === "white" && value === "black") {
			this.#turn = "black";
		} else if (this.#turn === "black" && value === "white") {
			this.#turn = "white";
		} 
	}

	get kingMoves () {
		return this.#kingMoves;
	}
	
	set piecesBlack (value) {
		if (value === -1) {
			this.#kingMoves = this.#kingMoves + value;
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
	
}

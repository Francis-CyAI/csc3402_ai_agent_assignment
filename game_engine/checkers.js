import move from "src/controllers/move.js";
import piece from "src/controllers/piece.js";
import square from "src/controllers/square.js";
import turn from "src/controllers/turn.js";
import state from "src/controllers/state.js";
//import importservice from "src/controllers/importservice.js";
//import exportservice from "src/controllers/exportservice.js";

class Checkers {
	var #piecesWhite = 20;
	var #piecesBlack = 20;
	var #turn = "white";
	var #kingMoves = 25;
	var #piecesSquarePairingBlack = new Map((function () {
			let pairing = [];
			let pieceId = 1;
			let squareId = 2;
			let onNextLine = "add_one";
			for (let i = 0; i <= 20; i = i + 1) {
				for (let j = 0; j <= 4; j = j + 1) {
					pairing.push([pieceId, [squareId ,0 ]]);
					pieceId = pieceId + 1;
					squareId = squareId + 2;
				}
				if (onNextLine === "add_one") {
					squareId = squareId + 1;
					atNextLine = "add_three"
				} else {
					squareId = squareId + 3;
					atNextLine = "add_one";
				}
			}
			return pairing;
		})()
	);
	var #piecesSquarePairingWhite = new Map((function () {
			let pairing = [];
			let pieceId = 21;
			let squareId = 62;
			let onNextLine = "add_one";
			for (let i = 0; i <= 20; i = i + 1) {
				for (let j = 0; j <= 4; j = j + 1) {
					pairing.push([pieceId, [squareId ,0 ]]);
					pieceId = pieceId + 1;
					squareId = squareId + 2;
				}
				if (onNextLine === "add_one") {
					squareId = squareId + 1;
					atNextLine = "add_three"
				} else {
					squareId = squareId + 3;
					atNextLine = "add_one";
				}
			}
			return pairing;
		})()
	);

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
		if (this._turn === "white" && value === "black") {
			this._turn = "black";
		} else if (this._turn === "black" && value === "white") {
			this._turn = "white";
		} 
	}

	get kingMoves () {
		return this._kingMoves;
	}
	
	set piecesBlack (value) {
		if (value === -1) {
			this._kingMoves = this._kingMoves + value;
		}
	}

	getPiecesSquarePairingBlack (pieceId) {
		return this.#piecesSquarePairingBlack.get(pieceId);
	}
	
	setPieceBlackKing (pieceId) {
		if (pieceId > 0 && pieceId < 21) {
			let pieceArray = #piecesSquarePairingBlack.get(pieceId);
			if (pieceArray[1] === 0) {
				pieceArray[1] = 1;
				#piecesSquarePairingBlack.set(pieceId, pieceArray);
			}
		}
	}
	
	setPieceBlackSquare (pieceId, squareId) {
		if ((pieceId > 0 && pieceId < 21) && (squareId > 0 && squareId < 100)) {
			let pieceArray = #piecesSquarePairingBlack.get(pieceId);
			pieceArray[0] = squareId;
			#piecesSquarePairingBlack.set(pieceId, pieceArray);
		}
	}
	
	
	getPiecesSquarePairingWhite (pieceId) {
		return this.#piecesSquarePairingWhite.get(pieceId);
	}
	
	setPieceWhiteKing (pieceId) {
		if (pieceId > 20 && pieceId < 41) {
			let pieceArray = #piecesSquarePairingWhite.get(pieceId);
			if (pieceArray[1] === 0) {
				pieceArray[1] = 1;
				#piecesSquarePairingWhite.set(pieceId, pieceArray);
			}
		}
	}
	
	setPieceWhiteSquare (pieceId, squareId) {
		if ((pieceId > 20 && pieceId < 41) && (squareId > 0 && squareId < 100)) {
			let pieceArray = #piecesSquarePairingWhite.get(pieceId);
			pieceArray[0] = squareId;
			#piecesSquarePairingWhite.set(pieceId, pieceArray);
		}
	}
	
}

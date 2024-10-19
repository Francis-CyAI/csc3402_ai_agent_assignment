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
piece (pieceId, method) { //XXX: To be tested
	var thisInstance = this;
	
	function occupies(pieceId) {
		var pairing;
		if (pieceId < 21) {
		pairing = thisInstance.getPiecesSquarePairingBlack(pieceId);
	} else if (pieceId < 41) {
		pairing = thisInstance.getPiecesSquarePairingWhite(pieceId);
		}
		return pairing[0];
	}

	function hasMoves(pieceId) {
		var a = moves(pieceId);
		if (a.length === 4) {
			return false;
		} else {
			return true;
		}
    }

	function moves(pieceId) {
		var si = occupies(pieceId);
		var si11;
		var si22;
		var i = 0;
		var arrayMoves = [];
		var push_xx0 =  function () {
			if (i === 0) {
			arrayMoves.push("tl0");
			} else if (i === 1) {
			arrayMoves.push("tr0");
			} else if (i === 2) {
			arrayMoves.push("br0");
			} else if (i === 3) {
			arrayMoves.push("bl0");
			}
			si = occupies(pieceId);
			i = i + 1;
		};
		var push_xx1 =  function () {
			if (i === 0) {
			arrayMoves.push("tl1");
			} else if (i === 1) {
			arrayMoves.push("tr1");
			} else if (i === 2) {
			arrayMoves.push("br1");
			} else if (i === 3) {
			arrayMoves.push("bl1");
			}
			si = occupies(pieceId); 
			i = i + 1;
		};
		var push_squareId =  function () {
			arrayMoves.push(si);
			if (i === 0) {
				si = si - 11;
			} else if (i === 1) {
				si = si - 9;
			} else if (i === 2) {
				si = si + 9;
			} else if (i === 3) {
				si = si + 11;
			}
		};
		//XXX: NOTE => b = 1; w = 2; . = 3; e = 4
		
		while (i < 4) {
			if (i === 0) {//XXX: START OF => Top-left diagonal
				if (thisInstance.square(thisInstance.piece(pieceId, "occupies"), "occupantType") !== "manBlack") {
					if ( 
							(thisInstance.square(thisInstance.piece(pieceId, "occupies"), "occupantType") === "manWhite") && 
							(arrayMoves.length === 1) && 
							( 
								(((si11 * si11) + si22) === 10) || 
								(((si11 * si11) + si22) === 11) || 
								(((si11 * si11) + si22) === 12) || 
								(((si11 * si11) + si22) === 21) 
							)
						) {
						push_xx0();
						continue;
					} else { 
						si11 = thisInstance.square(si - 11, "occupantType");
						si22 = thisInstance.square(si - 22, "occupantType");
						
						if ((si11 === "manBlack") || (si11 === "kingBlack")) {
							si11 = 1;
						} else if ((si11 === "manWhite") || (si11 === "kingWhite")) {
							si11 = 2;
						} else if (si11 === "none") {
							si11 = 3;
						} else {
							si11 = 12;
						}
						
						if ((si22 === "manBlack") || (si22 === "kingBlack")) {
							si22 = 1;
						} else if ((si22 === "manWhite") || (si22 === "kingWhite")) {
							si22 = 2;
						} else if (si22 === "none") {
							si22 = 3;
						} else {
							si22 = 12;
						}
						
						if (si11 === 12) {
								push_xx0();
								continue;  //To next diagonal
						} else {
							if (((si11 * si11) + si22) <= 5) {
									if (pieceId <= 21) { //if black piece
									push_xx0();
									continue;  //To next diagonal
								} else { //if white piece
									if (((si11 * si11) + si22) <= 3) {
										push_xx0();
										continue;  //To next diagonal
									} else if (((si11 * si11) + si22) === 4) {
										push_xx1();
										continue;  //To next diagonal
									} else if (((si11 * si11) + si22) === 5) {
										push_xx0();
										continue;  //To next diagonal
									}
								}
							} else if (((si11 * si11) + si22) === 6) {
								if (pieceId <= 20) { //if black piece
									push_xx1();
									continue;  //To next diagonal
								} else { //if white piece
									push_xx0();
									continue;  //To next diagonal
								}
								
							} else if (((si11 * si11) + si22) <= 10) {
								push_squareId();
							} else if (((si11 * si11) + si22) <= 16) {
								push_xx0();
								continue;  //To next diagonal
							} else if (((si11 * si11) + si22) === 21) {
								push_squareId();
							}
						}
					}
					} else {
						push_xx0();
						continue;  //To next diagonal
					}//XXX: END OF => Top-left diagonal
				} else if (i === 1) {//XXX: START OF => Top-right diagonal
				if (thisInstance.square(thisInstance.piece(pieceId, "occupies"), "occupantType") !== "manBlack") {
					if ( 
							(thisInstance.square(thisInstance.piece(pieceId, "occupies"), "occupantType") === "manWhite") && 
							(arrayMoves.length === 1) && 
							( 
								(((si11 * si11) + si22) === 10) || 
								(((si11 * si11) + si22) === 11) || 
								(((si11 * si11) + si22) === 12) || 
								(((si11 * si11) + si22) === 21) 
							)
						) {
						push_xx0();
						continue;
					} else { 
						si11 = thisInstance.square(si - 9, "occupantType");
						si22 = thisInstance.square(si - 18, "occupantType");
						
						if ((si11 === "manBlack") || (si11 === "kingBlack")) {
							si11 = 1;
						} else if ((si11 === "manWhite") || (si11 === "kingWhite")) {
							si11 = 2;
						} else if (si11 === "none") {
							si11 = 3;
						} else {
							si11 = 12;
						}
						
						if ((si22 === "manBlack") || (si22 === "kingBlack")) {
							si22 = 1;
						} else if ((si22 === "manWhite") || (si22 === "kingWhite")) {
							si22 = 2;
						} else if (si22 === "none") {
							si22 = 3;
						} else {
							si22 = 12;
						}
						
						if (si11 === 12) {
								push_xx0();
								continue;  //To next diagonal
						} else {
							if (((si11 * si11) + si22) <= 5) {
									if (pieceId <= 21) { //if black piece
									push_xx0();
									continue;  //To next diagonal
								} else { //if white piece
									if (((si11 * si11) + si22) <= 3) {
										push_xx0();
										continue;  //To next diagonal
									} else if (((si11 * si11) + si22) === 4) {
										push_xx1();
										continue;  //To next diagonal
									} else if (((si11 * si11) + si22) === 5) {
										push_xx0();
										continue;  //To next diagonal
									}
								}
							} else if (((si11 * si11) + si22) === 6) {
								if (pieceId <= 20) { //if black piece
									push_xx1();
									continue;  //To next diagonal
								} else { //if white piece
									push_xx0();
									continue;  //To next diagonal
								}
								
							} else if (((si11 * si11) + si22) <= 10) {
								push_squareId();
							} else if (((si11 * si11) + si22) <= 16) {
								push_xx0();
								continue;  //To next diagonal
							} else if (((si11 * si11) + si22) === 21) {
								push_squareId();
							}
						}
					}
					} else {
						push_xx0();
						continue;  //To next diagonal
					}//XXX: END OF => Top-right diagonal
				} else if (i === 2) {//XXX: START OF => Bottom-right diagonal
				if (thisInstance.square(thisInstance.piece(pieceId, "occupies"), "occupantType") !== "manWhite") {
					if ( 
							(thisInstance.square(thisInstance.piece(pieceId, "occupies"), "occupantType") === "manBlack") && 
							(arrayMoves.length === 1) && 
							( 
								(((si11 * si11) + si22) === 10) || 
								(((si11 * si11) + si22) === 11) || 
								(((si11 * si11) + si22) === 12) || 
								(((si11 * si11) + si22) === 21) 
							)
						) {
						push_xx0();
						continue;
					} else { 
						si11 = thisInstance.square(si + 9, "occupantType");
						si22 = thisInstance.square(si + 18, "occupantType");
						
						if ((si11 === "manBlack") || (si11 === "kingBlack")) {
							si11 = 1;
						} else if ((si11 === "manWhite") || (si11 === "kingWhite")) {
							si11 = 2;
						} else if (si11 === "none") {
							si11 = 3;
						} else {
							si11 = 12;
						}
						
						if ((si22 === "manBlack") || (si22 === "kingBlack")) {
							si22 = 1;
						} else if ((si22 === "manWhite") || (si22 === "kingWhite")) {
							si22 = 2;
						} else if (si22 === "none") {
							si22 = 3;
						} else {
							si22 = 12;
						}
						
						if (si11 === 12) {
								push_xx0();
								continue;  //To next diagonal
						} else {
							if (((si11 * si11) + si22) <= 5) {
									if (pieceId <= 21) { //if black piece
									push_xx0();
									continue;  //To next diagonal
								} else { //if white piece
									if (((si11 * si11) + si22) <= 3) {
										push_xx0();
										continue;  //To next diagonal
									} else if (((si11 * si11) + si22) === 4) {
										push_xx1();
										continue;  //To next diagonal
									} else if (((si11 * si11) + si22) === 5) {
										push_xx0();
										continue;  //To next diagonal
									}
								}
							} else if (((si11 * si11) + si22) === 6) {
								if (pieceId <= 20) { //if black piece
									push_xx1();
									continue;  //To next diagonal
								} else { //if white piece
									push_xx0();
									continue;  //To next diagonal
								}
								
							} else if (((si11 * si11) + si22) <= 10) {
								push_squareId();
							} else if (((si11 * si11) + si22) <= 16) {
								push_xx0();
								continue;  //To next diagonal
							} else if (((si11 * si11) + si22) === 21) {
								push_squareId();
							}
						}
					}
					} else {
						push_xx0();
						continue;  //To next diagonal
					}//XXX: END OF => Bottom-right diagonal
				} else {//TODO: START OF => Bottom-left diagonal
				if (thisInstance.square(thisInstance.piece(pieceId, "occupies"), "occupantType") !== "manWhite") {
					if ( 
							(thisInstance.square(thisInstance.piece(pieceId, "occupies"), "occupantType") === "manBlack") && 
							(arrayMoves.length === 1) && 
							( 
								(((si11 * si11) + si22) === 10) || 
								(((si11 * si11) + si22) === 11) || 
								(((si11 * si11) + si22) === 12) || 
								(((si11 * si11) + si22) === 21) 
							)
						) {
						push_xx0();
						continue;
					} else { 
						si11 = thisInstance.square(si + 11, "occupantType");
						si22 = thisInstance.square(si + 22, "occupantType");
						
						if ((si11 === "manBlack") || (si11 === "kingBlack")) {
							si11 = 1;
						} else if ((si11 === "manWhite") || (si11 === "kingWhite")) {
							si11 = 2;
						} else if (si11 === "none") {
							si11 = 3;
						} else {
							si11 = 12;
						}
						
						if ((si22 === "manBlack") || (si22 === "kingBlack")) {
							si22 = 1;
						} else if ((si22 === "manWhite") || (si22 === "kingWhite")) {
							si22 = 2;
						} else if (si22 === "none") {
							si22 = 3;
						} else {
							si22 = 12;
						}
						
						if (si11 === 12) {
								push_xx0();
								continue;  //To next diagonal
						} else {
							if (((si11 * si11) + si22) <= 5) {
									if (pieceId <= 21) { //if black piece
									push_xx0();
									continue;  //To next diagonal
								} else { //if white piece
									if (((si11 * si11) + si22) <= 3) {
										push_xx0();
										continue;  //To next diagonal
									} else if (((si11 * si11) + si22) === 4) {
										push_xx1();
										continue;  //To next diagonal
									} else if (((si11 * si11) + si22) === 5) {
										push_xx0();
										continue;  //To next diagonal
									}
								}
							} else if (((si11 * si11) + si22) === 6) {
								if (pieceId <= 20) { //if black piece
									push_xx1();
									continue;  //To next diagonal
								} else { //if white piece
									push_xx0();
									continue;  //To next diagonal
								}
								
							} else if (((si11 * si11) + si22) <= 10) {
								push_squareId();
							} else if (((si11 * si11) + si22) <= 16) {
								push_xx0();
								continue;  //To next diagonal
							} else if (((si11 * si11) + si22) === 21) {
								push_squareId();
							}
						}
					}
					} else {
						push_xx0();
						continue;  //To next diagonal
					}//XXX: END OF => Bottom-left diagonal
				} 
		}
	return arrayMoves;
	} //XXX: END OF => moves
	
	if (method === "occupies") {
		return occupies(pieceId);
	} else if (method === "hasMoves") {
		return hasMoves(pieceId);
	}  else if (method === "moves") {
		return moves(pieceId);
	}
}

move (squareId01, squareId02) {
	var pieceId = square(squareId01, "occupantId");
	var a = piece(pieceId, "moves");
	
	if (a.includes(squareId02)) {
		if (pieceId <= 20) {
			setPieceBlackSquare(pieceId, squareId02);
		} else {
			setPieceWhiteSquare(pieceId, squareId02);
		}
	}
	
}

playing (method = "turn") {
	var thisInstance = this;
	function hasMoves() {
		var pieceId; var n;
	
		if (thisInstance.turn === "white") {
			pieceId = 21; n = 41;
		} else {
			pieceId = 1; n = 21;
		}
	
		for (pieceId; pieceId < n; pieceId = pieceId + 1) {
			if (thisInstance.piece(pieceId,  "hasMoves") === true) {
				return true; //
			}
		}
		return false;
	}
	
	if (method === "turn") {
		return thisInstance.turn;
	} else if (method === "hasMoves")
		return hasMoves();
	}

square (squareId, method) {
	var thisInstance = this;
	function occupantId(squareId) {
		var pairingBlack;
		var pairingWhite;
		for (let i = 1; i <= 40; i = i + 1) {
			if (i <= 20) {
			pairingBlack = thisInstance.getPiecesSquarePairingBlack(i);
				if (squareId === pairingBlack[0]) {
					return i;
				}
			} else {
			pairingWhite = thisInstance.getPiecesSquarePairingWhite(i);
				if (squareId === pairingWhite[0]) {
				return i;
				}	
			}
		}
		return 0;
	}
	
	function occupantType(squareId) {
		var pairingBlack;
		var pairingWhite;
		for (let i = 1; i <= 40; i = i + 1) {
			if (i <= 20) {
			pairingBlack = thisInstance.getPiecesSquarePairingBlack(i);
				if (squareId === pairingBlack[0]) {
					if (pairingBlack[1] === 1) {
						return "kingBlack";
					} else {
						return "manBlack";
					}
				}
			} else {
			pairingWhite = thisInstance.getPiecesSquarePairingWhite(i);
				if (squareId === pairingWhite[0]) {
				if (pairingWhite[1] === 1) {
						return "kingWhite";
					} else {
						return "manWhite";
					}
				}	
			}
		}
		return "none";
	}
	
	if (method === "occupantId") {
		return occupantId(squareId);
	} else if (method === "occupantType") {
		return occupantType(squareId);
	}
}

state () {
	if (piecesWhite === 0) {
		return "winBlack";
	} else if (piecesBlack=== 0) {
		return "winWhite";
	} else if (playing("hasMoves") === false) {
		if (turn --- "black") {
			return "winWhite";
		} else {
			return "winBlack";
		}
	} else if (kingMoves === 0) {
		return "draw";
	} else {
		return "ongoing";
	}
}
}


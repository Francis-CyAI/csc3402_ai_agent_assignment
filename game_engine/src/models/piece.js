/// This file contains all the classes partaining to the game engine


/* Pieces  */
class Piece {
    /**
     * 
     * @param {*} id is the unique identifier of the piece
     * @param {*} possibleDestinations is the array of ids of all possible destination squares
     */
    constructor(id, possibleDestinations){
        this.id = id
        this.possibleDestinations = possibleDestinations
    }
}

class Man extends Piece {
    constructor(id) {
        super.id = id
    }
}
import Piece from "./piece_type"

interface SquareType {
    playable: boolean,
    occupied?: boolean,
    piece?: Piece
}

export default SquareType
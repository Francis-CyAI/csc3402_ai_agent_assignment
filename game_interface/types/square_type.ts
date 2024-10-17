import Piece from "./piece_type"

export default interface SquareType {
    playable: boolean,
    occupied?: boolean,
    piece?: Piece
}
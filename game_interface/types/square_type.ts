import Piece from "./piece_type"

export interface SquareType {
    playable: boolean,
    occupied?: boolean,
    piece?: Piece
}
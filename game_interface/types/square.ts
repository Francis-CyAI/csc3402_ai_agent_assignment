import Piece from "./piece"

export interface SquareType {
    playable: boolean,
    occupied: boolean,
    piece: Piece
}
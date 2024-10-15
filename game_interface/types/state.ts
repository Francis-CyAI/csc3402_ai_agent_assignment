import Piece from "./piece"

export interface SquareState {
    occupied: boolean,
    piece: Piece
}
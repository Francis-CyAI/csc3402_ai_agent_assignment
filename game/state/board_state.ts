/**
 * BoardState is a matrix state of the checkers board.
 * The cells of the matrix will contain each a Square, which will be either playable or not.
 * Each Square will have its relevant mehods.
 * 
 * This is the initial board state
 */

import { BoardStateType } from "@/types/board_state_type"
import { pieceColor1, pieceColor2 } from "@/contants"

export let partialInitialBoardState: BoardStateType = [
    [
        { playable: false }, 
        { playable: true, occupied: true, piece: { type: "man", color: pieceColor1 } }
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [
        { playable: true, occupied: true, piece: { type: "man", color: pieceColor2 } },
        { playable: false }
    ],
]
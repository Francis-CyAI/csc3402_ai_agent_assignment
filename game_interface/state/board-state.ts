/**
 * BoardState is a matrix state of the checkers board.
 * The cells of the matrix will contain each a Square, which will be either playable or not.
 * Each Square will have its relevant mehods.
 * 
 * This is the initial board state
 */

import { SquareType } from "@/types/square_type"

export type BoardType = [ //  whole: column
    SquareType[], // row. Max length = 10
    SquareType[],
    SquareType[],
    SquareType[],
    SquareType[],
    SquareType[],
    SquareType[],
    SquareType[],
    SquareType[],
    SquareType[]
]
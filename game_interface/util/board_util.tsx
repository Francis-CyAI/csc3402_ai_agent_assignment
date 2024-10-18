import Square from "../ui-elements/square"
import { sqrColor1, sqrColor2, boardSquareConfigCount, pieceColor1, pieceColor2 } from "@/contants"
import { partialInitialBoardState } from "@/state/board_state"
import SquareType from "@/types/square_type"
import PieceType from "@/types/piece_type"
import { BoardStateType } from "@/types/board_state_type"

export function generateInitialBoardState(): BoardStateType {
    let first = 0
    let second = 1
    let last = boardSquareConfigCount - 1

    let boardState = partialInitialBoardState

    console.log("\n\nPatial board state is ", boardState, "\n\n")

    let currentSquarePlayable = !boardState[first][first].playable

    for (let row = first; row <= last; row++) {
        let currentRow = boardState[row]
        for (let col = first; col <= last; col++) {
            if ((row == first) && col == first) {
                continue
            }
            let square: SquareType = { playable: currentSquarePlayable }

            if (currentSquarePlayable) {
                let piece: PieceType = {
                    type: "man",
                    color: pieceColor1
                }
                square.playable = true
                if (row < 3 || row > last - 3) {
                    square.occupied = true
                    if (row > last - 3) {
                        piece.color = pieceColor2
                    }
                }
                if (square.occupied) {
                    square.piece = piece
                }
            }
            currentRow[col] = square
            currentSquarePlayable = !currentSquarePlayable
        }
        currentSquarePlayable = !currentSquarePlayable
    }
    return boardState
}

/*
export function createBoardSquares(dimension: number, startColor: string) {
    let colors = {
        1: startColor,
        0: ""
    }
    if (startColor == sqrColor1) {
        colors[1] = sqrColor2
    } else {
        colors[0] = sqrColor1
    }

    let boardSquareMatrix = []

    let flag = false;

    let sqrCount = 1


    for (let i = 1; i <= dimension; i++) {
        let ithRow = []
        for (let j = 1; j <= dimension; j++) {
            console.log("flag is ", flag)
            ithRow.push(
                <Square
                    key={i * j}
                    id={`square-${sqrCount}`}
                    color={colors[Number(flag)]}
                    onlick={() => {
                        alert(`square-${sqrCount} just got clicked`)
                    }}
                    initialState={
                        {
                            occupied: true,
                            piece: {
                                type: "man",
                                color: colors[Number(!flag)]
                            }
                        }
                    }
                />
            )
            flag = !flag
            console.log("flag is now ", flag)
            sqrCount++
        }
        boardSquareMatrix.push(ithRow)
        flag = !flag
    }

    return boardSquareMatrix
}
*/

export function generateBoardElementMatrix() {
    let initialBoardState = generateInitialBoardState()

    // TODO: remove
    console.log("\n\nInitial Board state is \n", initialBoardState, "\n\n")

    let first = 0
    let last = initialBoardState.length - 1

    let idCount = 0

    let colors = {
        1: sqrColor1,
        0: sqrColor2
    }

    let boardMatrix = []


    for (let row = first; row <= last; row++) {
        let squareRow = []

        for (let col = first; col <= last; col++) {
            let squareState: SquareType = initialBoardState[row][col]
            idCount++
            squareRow.push(
                <Square
                    id={`square-${idCount}`}
                    key={idCount}
                    color={colors[Number(squareState.playable)]}
                    onlick={() => {
                        `square-${idCount} got clicked`
                    }}
                    initialState={squareState}
                />
            )
        }
        boardMatrix.push(squareRow)
    }
    return boardMatrix
}
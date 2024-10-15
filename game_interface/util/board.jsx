import Square from "../ui-elements/square"
import { sqrColor1, sqrColor2 } from "@/contants"

export function createBoardSquares(dimension , startColor ) {
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

    let flag = true;


    for (let i = 1; i <= dimension; i++) {
        let ithRow = []
        for (let i = 1; i <= dimension; i++) {
            ithRow.push(
                <Square 
                    id={`square-${i}`}
                    color={colors[flag]}
                    onlick={() => {
                        alert(`square-${i} just got clicked`)
                    }}
                    initialState={
                        {
                            occupied: true,
                            piece: {
                                type: "man",
                                color: colors[!flag]
                            }
                        }
                    }
                />
            )
            flag = !flag
        }
        boardSquareMatrix.push(ithRow)        
    }

    return boardSquareMatrix
}
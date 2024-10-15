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

    let flag = false;

    let sqrCount = 1


    for (let i = 1; i <= dimension; i++) {
        let ithRow = []
        for (let j = 1; j <= dimension; j++) {
            console.log("flag is ", flag)
            ithRow.push(
                <Square 
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
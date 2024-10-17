import { SquareType } from "@/types/square"

export type BoardStateType = [ //  whole: column
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
'use client'

import SquareType from "@/types/square_type";
import PieceType from "@/types/piece_type";
// import PieceType from "@/types/piece";
import Piece from "./piece";
import { useSelector, useDispatch } from "react-redux";
import { updateFromSquare, updateToSquare, fromSquareSelected, fromSquareDeselected, toSquareSelected, toSquareDeselected, clear } from "@/redux/squareSlice";
import { BoardStateType } from "@/types/board_state_type";

export default function Square(props: { id: string, color: string, onlick: Function, initialState: SquareType, keyValue: number }) {
    let squaresState = useSelector(state => state.squares)
    let boardState = useSelector(state => state.board)
    const dispatch = useDispatch()

    let keyValue = 0
    if (props.keyValue == null) {
        keyValue = props.keyValue
    }

    let pieceInfo: PieceType = props.initialState.piece as PieceType

    let piece = props.initialState.occupied ? <Piece info={pieceInfo} /> : <></>;

    return (
        <div key={keyValue} id={props.id} className={`${props.color} w-8 h-8 square`}
            onClick={() => {
                console.log("Current squares state", squaresState)

                if (!squaresState.toSquareSelected && !squaresState.fromSquareSelected) {
                    // destination and source squares not selected: selecte source
                    dispatch(updateFromSquare(props.initialState.coordinates))
                    dispatch(fromSquareSelected())
                } else if (!squaresState.toSquareSelected && squaresState.fromSquareSelected) {
                    // source already selected, destination not selected: select destination
                    dispatch(updateToSquare(props.initialState.coordinates))
                    dispatch(toSquareSelected())
                }
                // ending here in the chain of if-else statements makes this game touch and go
                // TODO: inforce more rules

                if (squaresState.toSquareSelected && squaresState.fromSquareSelected) {
                    // both source and destination have been selected
                    // TODO: check if move is valid before moving the piece

                    const moveApproved = true

                    if (moveApproved) {
                        // let fromCoord:[number, number] = squaresState.fromSquare
                        // let toCoord:[number, number] = squaresState.toSquare

                        let board: BoardStateType = boardState.current

                        let fromRow:number = squaresState.fromSquare[0]
                        let fromCol:number = squaresState.fromSquare[1]

                        let toRow:number = squaresState.toSquare[0]
                        let toCol:number = squaresState.toSquare[1]

                        let fromSqrOnBoard: SquareType = board[fromRow, fromCol]
                        let toSqrOnBoard: SquareType = board[toRow, fromCol]


                        if (!fromSqrOnBoard.occupied) {
                            alert("Invalid. There is no piece on the source square.")
                            dispatch(clear())
                            return
                        } else if (toSqrOnBoard.occupied){
                            alert("Invalid. There is already a piece on the destination square.")
                            dispatch(clear())
                            return
                        }

                        // let fromSqrOnBoardPiece: PieceType = fromSqrOnBoard.piece as PieceType

                    }
                }
            }}
        >
            {piece}
        </div>
    );
}
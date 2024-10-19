'use client'

import SquareType from "@/types/square_type";
import PieceType from "@/types/piece_type";
// import PieceType from "@/types/piece";
import Piece from "./piece";
import { useSelector, useDispatch } from "react-redux";
import { updateFromSquare, updateToSquare, fromSquareSelected, fromSquareDeselected, toSquareSelected, toSquareDeselected, clearSquareSelections } from "@/redux/squareSlice";
import { updateBoard } from "@/redux/boardSlice";
import { BoardStateType } from "@/types/board_state_type";
import { generateInitialBoardState } from "@/util/board_util";

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
                // console.log("Current squares state", squaresState)

                if (!squaresState.fromSquareSelected && !squaresState.toSquareSelected) {
                    // source squares not selected: selecte source
                    dispatch(updateFromSquare(props.initialState.coordinates))
                    dispatch(fromSquareSelected())

                    alert("source square selected")
                } else if (!squaresState.toSquareSelected && squaresState.fromSquareSelected) {
                    // source already selected, destination not selected: select destination
                    dispatch(updateToSquare(props.initialState.coordinates))
                    dispatch(toSquareSelected())

                    alert("destination square selected.\nswap performed")
                    // TODO: clear square selections after successful swap

                    // TODO: inforce more rules

                    let fromSqrCoord = squaresState.fromSquare
                    let toSqrCoord = props.initialState.coordinates

                        // both source and destination have been selected
                        // TODO: check if move is valid before moving the piece

                        const moveApproved = true

                        if (moveApproved) {
                            // let fromCoord:[number, number] = squaresState.fromSquare
                            // let toCoord:[number, number] = squaresState.toSquare

                            let board: BoardStateType = boardState.current

                            let fromRow: number = squaresState.fromSquare[0]
                            let fromCol: number = squaresState.fromSquare[1]

                            let toRow: number = props.initialState.coordinates[0]
                            let toCol: number = props.initialState.coordinates[1]

                            let fromSqrOnBoard: SquareType = board[fromRow][fromCol]
                            let toSqrOnBoard: SquareType = board[toRow][toCol]

                            console.log("\n\nfromSqrOnBoard", fromSqrOnBoard, "\n")
                            console.log("\ntoSqrOnBoard", toSqrOnBoard, "\n\n")

                            if (!fromSqrOnBoard.occupied) {
                                alert("Invalid. There is no piece on the source square.")
                                dispatch(clearSquareSelections())
                                return
                            } else if (toSqrOnBoard.occupied) {
                                alert("Invalid. There is already a piece on the destination square.")
                                dispatch(clearSquareSelections())
                                return
                            } else {
                                // perform move
                                // toSqrOnBoard.piece = fromSqrOnBoard.piece
                                // toSqrOnBoard.occupied = true

                                // create new to square with the same properties and new state
                                let newToSquare: SquareType = {
                                    playable: true,
                                    piece: fromSqrOnBoard.piece,
                                    occupied: true,
                                    coordinates: toSqrOnBoard.coordinates
                                }

                                let newFromSquare: SquareType = {
                                    playable: true,
                                    coordinates: fromSqrOnBoard.coordinates
                                }
                                

                                // delete fromSqrOnBoard.piece
                                // fromSqrOnBoard.occupied = false

                                // Create a deep copy of the partialInitialBoardState
                                let newBoardState: BoardStateType = board.map(row => row.map(square => ({ ...square })))


                                newBoardState[fromRow, fromCol] = newFromSquare
                                newBoardState[toRow, toCol] = newToSquare


                                dispatch(updateBoard(generateInitialBoardState())) // dispatch(updateBoard(newBoardState))
                                dispatch(clearSquareSelections())
                            }
                        }
                } else {
                    dispatch(clearSquareSelections())
                    alert("Your selections have been cleared. Please select a new source square and a new destination square.")
                }
                
            }}
        >
            {piece}
        </div>
    );
}
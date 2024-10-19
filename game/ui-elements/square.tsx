'use client'

import SquareType from "@/types/square_type";
import PieceType from "@/types/piece_type";
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

                if (!squaresState.fromSquareSelected && !squaresState.toSquareSelected) {
                    // Select the source square
                    dispatch(updateFromSquare(props.initialState.coordinates))
                    dispatch(fromSquareSelected())
                    alert("Source square selected.")
                } else if (!squaresState.toSquareSelected && squaresState.fromSquareSelected) {
                    // Select the destination square
                    dispatch(updateToSquare(props.initialState.coordinates))
                    dispatch(toSquareSelected())
                    alert("Destination square selected.\nAttempting move...")

                    let fromRow: number = squaresState.fromSquare[0]
                    let fromCol: number = squaresState.fromSquare[1]

                    let toRow: number = props.initialState.coordinates[0]
                    let toCol: number = props.initialState.coordinates[1]

                    let board: BoardStateType = boardState.current
                    let fromSqrOnBoard: SquareType = board[fromRow][fromCol]
                    let toSqrOnBoard: SquareType = board[toRow][toCol]

                    // Check if the move is valid
                    if (!fromSqrOnBoard.occupied) {
                        alert("Invalid move. No piece on the source square.")
                        dispatch(clearSquareSelections())
                        return
                    } else if (toSqrOnBoard.occupied) {
                        alert("Invalid move. The destination square is already occupied.")
                        dispatch(clearSquareSelections())
                        return
                    } else {
                        // Perform the move by swapping pieces
                        let newToSquare: SquareType = {
                            playable: true,
                            piece: fromSqrOnBoard.piece,  // Move the piece to the new square
                            occupied: true,
                            coordinates: toSqrOnBoard.coordinates
                        }

                        let newFromSquare: SquareType = {
                            playable: true,
                            piece: null, // Clear the piece from the original square
                            occupied: false,
                            coordinates: fromSqrOnBoard.coordinates
                        }

                        // Create a deep copy of the board state
                        let newBoardState: BoardStateType = board.map(row => row.map(square => ({ ...square })))

                        // Update the squares on the new board state
                        newBoardState[fromRow][fromCol] = newFromSquare
                        newBoardState[toRow][toCol] = newToSquare

                        // Dispatch the updated board state
                        dispatch(updateBoard(newBoardState))
                        dispatch(clearSquareSelections())

                        alert("Move completed successfully.")
                    }
                } else {
                    // Clear selections if both squares have been selected
                    dispatch(clearSquareSelections())
                    alert("Selections cleared. Please start over.")
                }
            }}
        >
            {piece}
        </div>
    );
}

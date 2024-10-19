'use client'

import SquareType from "@/types/square_type";
import PieceType from "@/types/piece_type";
import Piece from "./piece";
import { useSelector, useDispatch } from "react-redux";
import { updateFromSquare, updateToSquare, fromSquareSelected, toSquareSelected, clearSquareSelections } from "@/redux/squareSlice";
import { updateBoard } from "@/redux/boardSlice";
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
                    } else if (!toSqrOnBoard.playable) {
                        alert("Invalid move. The destination square is not playable.")
                        dispatch(clearSquareSelections())
                        return
                    } else {
                        // Perform the move by transferring only the contents (piece, occupied)
                        let updatedBoardState: BoardStateType = board.map(row => row.map(square => ({ ...square })))

                        // Transfer piece from the source to the destination square
                        updatedBoardState[toRow][toCol].piece = fromSqrOnBoard.piece;
                        updatedBoardState[toRow][toCol].occupied = true;

                        // Clear the source square
                        updatedBoardState[fromRow][fromCol].piece = undefined;
                        updatedBoardState[fromRow][fromCol].occupied = false;

                        // Dispatch the updated board state
                        dispatch(updateBoard(updatedBoardState))
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

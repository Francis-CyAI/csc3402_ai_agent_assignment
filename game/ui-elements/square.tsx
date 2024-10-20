'use client'

import SquareType from "@/types/square_type";
import PieceType from "@/types/piece_type";
import Piece from "./piece";
import { useSelector, useDispatch } from "react-redux";
import { updateFromSquare, updateToSquare, fromSquareSelected, toSquareSelected, clearSquareSelections } from "@/redux/squareSlice";
import { updateBoard } from "@/redux/boardSlice";
import { BoardStateType } from "@/types/board_state_type";
import { isDiagonalMove, isForwardMove, isSingleSquareMove, isValidCaptureMove, promoteToKing } from "@/util/game_play_rules_util";
import { player1Id, player2Id, boardSquareConfigCount } from "@/contants";

export default function Square(props: { id: string, color: string, onClick: Function, initialState: SquareType, keyValue: number }) {
    let squaresState = useSelector(state => state.squares)
    let boardState = useSelector(state => state.board)
    const dispatch = useDispatch()

    let keyValue = props.keyValue ?? 0;
    let pieceInfo: PieceType = props.initialState.piece as PieceType
    let piece = props.initialState.occupied ? <Piece info={pieceInfo} /> : <></>;

    const boardSize = boardSquareConfigCount;

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

                    let piece = fromSqrOnBoard.piece;
                    if (!piece) {
                        alert("Invalid move. No piece on the source square.")
                        dispatch(clearSquareSelections())
                        return;
                    }

                    // Check if the destination square is valid (not occupied and playable)
                    if (!toSqrOnBoard.playable || toSqrOnBoard.occupied) {
                        alert("Invalid move. The destination square is either occupied or not playable.");
                        dispatch(clearSquareSelections());
                        return;
                    }

                    // Check movement rules for man and king
                    if (!isDiagonalMove(fromSqrOnBoard, toSqrOnBoard)) {
                        alert("Invalid move. You must move diagonally.");
                        dispatch(clearSquareSelections());
                        return;
                    }

                    if (piece.type === "man" && !isForwardMove(fromSqrOnBoard, toSqrOnBoard, piece, player1Id, player2Id)) {
                        alert("Invalid move. Man pieces can only move forward.");
                        dispatch(clearSquareSelections());
                        return;
                    }

                    // If a capture is possible, it should be prioritized
                    if (isValidCaptureMove(fromSqrOnBoard, toSqrOnBoard, board, piece, player1Id, player2Id)) {
                        alert("Capture move detected! Jumping over an opponent.");
                        let updatedBoardState: BoardStateType = board.map(row => row.map(square => ({ ...square })))

                        // Remove the opponent piece
                        const middleRow = (fromRow + toRow) / 2;
                        const middleCol = (fromCol + toCol) / 2;
                        updatedBoardState[middleRow][middleCol].piece = undefined;
                        updatedBoardState[middleRow][middleCol].occupied = false;

                        // Perform the move
                        updatedBoardState[toRow][toCol].piece = { ...piece };
                        updatedBoardState[toRow][toCol].occupied = true;
                        updatedBoardState[fromRow][fromCol].piece = undefined;
                        updatedBoardState[fromRow][fromCol].occupied = false;

                        // Check for promotion to king
                        promoteToKing(updatedBoardState[toRow][toCol], piece, player1Id, player2Id, boardSize);

                        // Dispatch the updated board state
                        dispatch(updateBoard(updatedBoardState));
                        dispatch(clearSquareSelections());

                        alert("Move and capture completed successfully.");
                    } else {
                        // If no capture is possible, check if it is a valid forward move
                        if (piece.type === "man" && isSingleSquareMove(fromSqrOnBoard, toSqrOnBoard)) {
                            // Handle a valid single-square move forward for man pieces
                            let updatedBoardState: BoardStateType = board.map(row => row.map(square => ({ ...square })))

                            // Perform the move
                            updatedBoardState[toRow][toCol].piece = { ...piece };
                            updatedBoardState[toRow][toCol].occupied = true;
                            updatedBoardState[fromRow][fromCol].piece = undefined;
                            updatedBoardState[fromRow][fromCol].occupied = false;

                            // Check for promotion to king
                            promoteToKing(updatedBoardState[toRow][toCol], piece, player1Id, player2Id, boardSize);

                            // Dispatch the updated board state
                            dispatch(updateBoard(updatedBoardState));
                            dispatch(clearSquareSelections());

                            alert("Move completed successfully.");
                        } else if (piece.type === "king") {
                            // Handle king's movement (can move diagonally in any direction, single square)
                            let updatedBoardState: BoardStateType = board.map(row => row.map(square => ({ ...square })))

                            // Perform the move
                            updatedBoardState[toRow][toCol].piece = { ...piece };
                            updatedBoardState[toRow][toCol].occupied = true;
                            updatedBoardState[fromRow][fromCol].piece = undefined;
                            updatedBoardState[fromRow][fromCol].occupied = false;

                            // Dispatch the updated board state
                            dispatch(updateBoard(updatedBoardState));
                            dispatch(clearSquareSelections());

                            alert("King's move completed successfully.");
                        } else {
                            alert("Invalid move. Capture is required if available.");
                            dispatch(clearSquareSelections());
                            return;
                        }
                    }
                } else {
                    dispatch(clearSquareSelections())
                    alert("Selections cleared. Please start over.")
                }
            }}
        >
            {piece}
        </div>
    );
}

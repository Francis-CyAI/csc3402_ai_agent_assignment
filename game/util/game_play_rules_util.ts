import { BoardStateType } from "@/types/board_state_type";
import SquareType from "@/types/square_type";
import PieceType from "@/types/piece_type";

// Check if the move is diagonal
export function isDiagonalMove(from: SquareType, to: SquareType): boolean {
    const rowDiff = Math.abs(from.coordinates[0] - to.coordinates[0]);
    const colDiff = Math.abs(from.coordinates[1] - to.coordinates[1]);
    return rowDiff === colDiff;  // A move is diagonal if row and column difference are equal
}

// Check if a move is forward (adjusting for player 1 and player 2)
export function isForwardMove(from: SquareType, to: SquareType, piece: PieceType, player1Id: string, player2Id: string): boolean {
    if (piece.type === "man") {
        if (piece.playerId === player1Id) {
            return to.coordinates[0] > from.coordinates[0];  // Player 1 pieces move downwards (positive increment)
        } else if (piece.playerId === player2Id) {
            return to.coordinates[0] < from.coordinates[0];  // Player 2 pieces move upwards (negative increment)
        }
    }
    return true;  // Kings can move in any direction
}

// Check if the destination is one square away (for "man" pieces)
export function isSingleSquareMove(from: SquareType, to: SquareType): boolean {
    const rowDiff = Math.abs(from.coordinates[0] - to.coordinates[0]);
    return rowDiff === 1;  // A "man" moves one square at a time
}

// Check if a capture move is valid (jumping over an opponent)
export function isValidCaptureMove(from: SquareType, to: SquareType, board: BoardStateType, piece: PieceType, player1Id: string, player2Id: string): boolean {
    const rowDiff = Math.abs(from.coordinates[0] - to.coordinates[0]);
    const colDiff = Math.abs(from.coordinates[1] - to.coordinates[1]);

    if (rowDiff !== 2 || colDiff !== 2) return false;  // Capturing requires jumping two squares

    const middleRow = (from.coordinates[0] + to.coordinates[0]) / 2;
    const middleCol = (from.coordinates[1] + to.coordinates[1]) / 2;
    const middleSquare = board[middleRow][middleCol];

    // Check if the piece being jumped over belongs to the opponent
    return middleSquare.occupied && middleSquare.piece?.playerId !== piece.playerId;
}

// Promote a man to a king when it reaches the opposite side
export function promoteToKing(square: SquareType, piece: PieceType, player1Id: string, player2Id: string, boardSize: number) {
    const lastRowPlayer1 = boardSize - 1;
    const lastRowPlayer2 = 0;

    if (piece.playerId === player1Id && square.coordinates[0] === lastRowPlayer1 && piece.type === "man") {
        piece.type = "king";
    } else if (piece.playerId === player2Id && square.coordinates[0] === lastRowPlayer2 && piece.type === "man") {
        piece.type = "king";
    }
}

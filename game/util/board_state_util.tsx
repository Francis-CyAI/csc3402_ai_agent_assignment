// TODO: delete file


import { BoardStateType } from "@/types/board_state_type";
import { pieceColor1, pieceColor2 } from "@/contants";


// Simplify Board State
/*
function simplifyBoardState(boardState: BoardStateType) {
    return boardState.map((row) =>
        row.map((square) => {
            return {
                playable: square.playable,
                occupied: square.occupied,
                piece: square.occupied ? square.piece : null, // Store piece details only if occupied
            };
        })
    );
}
*/

export function simplifyBoardState(boardState: BoardStateType): number[][][] {
    return boardState.map((row) =>
        row.map((square) => {
            const playable = square.playable ? 1 : 0;
            const occupied = square.occupied ? 1 : 0;
            let piece = 0;

            if (square.piece) {
                piece = square.piece.color === pieceColor1 ? 1 : 2; // 1 for grey (player 1), 2 for blue (player 2)
            }

            return [playable, occupied, piece];
        })
    );
}



// Unsimplify Board State (convert simplified state back to detailed state)
export function unsimplifyBoardState(simplifiedState: any): BoardStateType {
    return simplifiedState.map((row: any[], rowIndex: number) =>
        row.map((square: any, colIndex: number) => {
            return {
                coordinates: [rowIndex, colIndex], // Reconstruct coordinates
                playable: square.playable,
                occupied: square.occupied,
                piece: square.occupied ? square.piece : null, // Only include piece if occupied
            };
        })
    );
}

export function encodeForML(simplifiedState: any): number[][] {
    return simplifiedState.map((row: any[]) =>
        row.map((square: any) => {
            const playable = square.playable ? 1 : 0;
            const occupied = square.occupied ? 1 : 0;
            const piece = square.piece ? (square.piece.color === pieceColor1 ? 1 : 2) : 0; // 1 for white, 2 for black, 0 for none
            return [playable, occupied, piece];
        })
    );
}

export function decodeFromML(mlEncodedState: number[][][]): any[][] {
    return mlEncodedState.map((row: number[][]) =>
        row.map((square: number[]) => {
            const playable = square[0] === 1;
            const occupied = square[1] === 1;
            let piece = null;

            if (square[2] === 1) {
                piece = { color: pieceColor1, type: 'man' }; // You can replace 'somePieceType' with actual piece logic
            } else if (square[2] === 2) {
                piece = { color: pieceColor2, type: 'man' }; // Replace 'somePieceType' as needed
            }

            return {
                playable: playable,
                occupied: occupied,
                piece: piece,
            };
        })
    );
}

// TODO: delete file


import { BoardStateType } from "@/types/board_state_type";


// Simplify Board State
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


// Unsimplify Board State (convert simplified state back to detailed state)
function unsimplifyBoardState(simplifiedState: any): BoardStateType {
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

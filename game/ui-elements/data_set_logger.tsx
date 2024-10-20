'use client'

import { useSelector } from "react-redux";
import { player2Id } from "@/contants";

export default function DataSetLogger() {
    let playersState = useSelector(state => state.players)
    let boardState = useSelector(state => state.board)

    let currentPlayerIndex = playersState.currentPlayerIndex
    let player2State = playersState.players[currentPlayerIndex] // {"playerId":"player-2","playerName":"Player 2","turn":true,"score":0}
    let player2Turn = player2State.playerId == player2Id

    let resultingBoardState:string = ""
    let currentBoardState:string = ""

    let stringifiedBoardState = JSON.stringify(boardState.current)

    let message:string

    if (player2Turn) {
        // log the before-state data sample
        currentBoardState = stringifiedBoardState
        // alert(`Player 2's turn. \ncurrent board state: \n\n ${JSON.stringify(currentBoardState)}`)
        message = "Player 2's turn. \ncurrent board state:\n\n"
    } else {
        // log the after-state data sample
        // Ignore the first time
        resultingBoardState = stringifiedBoardState
        // alert(`Player 1's turn. \nresulting board state: \n\n ${JSON.stringify(resultingBoardState)}`)
        message = "Please ignore the first time\n\n.Player 1's turn. \nresulting board state: \n\n"
    }

    // alert(JSON.stringify(playersState))


    return (
        
        <div>
            <div>
                { message }
            </div>
            <div>
                {resultingBoardState.length > 0 ? resultingBoardState : currentBoardState}
            </div>
        </div>
    )
}
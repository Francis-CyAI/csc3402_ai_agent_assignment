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


    if (player2Turn) {
        // log the before-state data sample
        currentBoardState = boardState
        // alert(`current board state: \n\n ${JSON.stringify(currentBoardState)}`)
    } else {
        // log the after-state data sample
        resultingBoardState = boardState
        // alert(`resulting board state: \n\n ${JSON.stringify(resultingBoardState)}`)
    }

    // alert(JSON.stringify(playersState))

    return <></>
}
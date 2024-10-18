'use client'

import SquareType from "@/types/square_type";
import PieceType from "@/types/piece_type";
// import { useState } from "react";
// import PieceType from "@/types/piece";
import Piece from "./piece";

export default function Square(props: { id: string, color: string, onlick: Function, initialState: SquareType, keyValue: number }) {
    // let [state, setState] = useState(props.initialState)
    let keyValue = 0
    if (props.keyValue == null) {
        keyValue = props.keyValue
    }

    let pieceInfo: PieceType = props.initialState.piece as PieceType

    let piece = props.initialState.occupied ? <Piece info={pieceInfo} /> : <></>;

    return (
        <div key={keyValue} id={props.id} className={`${props.color} w-8 h-8 square`}
            onClick={() => {
                props.onlick()
            }}
        >
            {piece}
        </div>
    );
}
'use client'

import { SquareState } from "@/types/state";
import { useState } from "react";
// import PieceType from "@/types/piece";
import Piece from "./piece";

export default function Square(props: { id: string, color: string, onlick: Function, initialState: SquareState, key: number}) {
    let [state, setState] = useState(props.initialState)
    if (props.key == null) {
        props.key = 0
    }

    /*
    let pieceInfo: PieceType = {
        type: "man",
        color: "bg-black" // tailwind style
    }*/

    let piece = props.initialState.occupied ? <Piece info={props.initialState.piece} /> : <></>;

    return (
        <div key={props.key} id={props.id} className={`${props.color} w-8 h-8 square`}
            onClick={() => {
                props.onlick()
            }}
        >
            {piece}
        </div>
    );
}
'use client'

import { SquareState } from "@/types/state";
import { useState } from "react";
import PieceType from "@/types/piece";

export default function Square(props: { id: string, color: string, onlick: Function, initialState: SquareState}) {
    let [state, setState] = useState(props.initialState)

    return (
        <div id={props.id} className={`${props.color} w-8 h-8 square`}
            onClick={() => {
                props.onlick
            }}
        >
        </div>
    );
}
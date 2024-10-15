'use client'

import { SquareState } from "@/types/state";
import { useState } from "react";

export default function Square(props: { id: string, color: string, onlick: Function, initialState: SquareState}) {
    let [state, setState] = useState(props.initialState)
    
    return (
        <div id={props.id} className={`${props.color} w-8 h-8`}
            onClick={() => {
                props.onlick
            }}
        >
        </div>
    );
}
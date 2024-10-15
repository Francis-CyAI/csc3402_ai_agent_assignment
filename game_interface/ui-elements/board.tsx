'use client'

import Square from "./square"

export default function Board() {
    return (
        <div className="board">
            <Square 
                id="sqr-1"
                color="white"
                onlick={() => {
                    alert("Square just got clicked")
                }}
                initialState={
                    {
                        occupied: true,
                        piece: {
                            type: "man",
                            color: "black" // tailwind style
                        }
                    }
                }
            />
        </div>
    );
}
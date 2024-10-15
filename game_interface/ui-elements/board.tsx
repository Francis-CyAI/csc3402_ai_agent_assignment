'use client'

import Square from "./square"

export default function Board() {
    return (
        <div>
            <Square 
                id="sqr-1"
                color="bg-white"
                onlick={() => {
                    alert("Square just got clicked")
                }}
                initialState={
                    {
                        occupied: true,
                        piece: {
                            type: "man",
                            color: "bg-black" // tailwind style
                        }
                    }
                }
            />
        </div>
    );
}
'use client'

import Square from "./square"
import { createBoardSquares } from "@/util/board";
import { sqrColor2 } from "@/contants";

export default function Board() {
    return (
        <div className="board">
            {
                /* 
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
                */
               createBoardSquares(10, sqrColor2).map((sqrList, index) => (
                <div key={index} className="square-row">
                    {
                        sqrList.map((sqr) => (
                            sqr
                        ))
                    }
                </div>
               ))
            }
            
        </div>
    );
}
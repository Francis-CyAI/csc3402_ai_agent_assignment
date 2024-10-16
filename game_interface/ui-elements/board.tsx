'use client'

import Square from "./square"
import { createBoardSquares } from "@/util/board";
import { sqrColor2 } from "@/contants";

export default function Board() {
    return (
        <div className="board">
            {
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
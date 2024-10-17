'use client'

import ScreenHeader from "./screen_header";
import { createBoardSquares } from "@/util/board_util";
import { sqrColor2 } from "@/contants";

export default function Board() {
    return (
        <div className="board">
            
            {
               createBoardSquares(10, sqrColor2).map((sqrList, index) => (
                <div key={index} className="square-row">
                    {
                        sqrList.map((sqr, index) => (
                            sqr
                        ))
                    }
                </div>
               ))
            }
            
        </div>
    );
}
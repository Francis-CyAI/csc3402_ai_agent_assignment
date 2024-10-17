'use client'

import ScreenHeader from "./screen_header";
import { generateBoardMatrix } from "@/util/board_util";
import { sqrColor2 } from "@/contants";
import { BoardStateType } from "@/types/board_state_type";
import Square from "./square";

export default function Board() {
    return (
        <div className="board">
            
            {
               generateBoardMatrix().map((sqrRow, index) => (
                <div key={index} className="square-row">
                    {
                        sqrRow.map((sqr) => (
                            sqr
                        ))
                    }
                </div>
               ))
               /*
                initialState.map((sqrList, index) => (
                    <div key={index} className="square-row">
                        {
                            sqrList.map((squareState, index) => (
                                <Square 
                                    id={`square-${index}`}
                                    key={index}
                                    onlick={() => {
                                        alert(`square-${index} got clicked`)
                                    }}
                                    initialState={squareState}
                                />
                            ))
                        }
                    </div>
                ))
                */
            }
            
        </div>
    );
}
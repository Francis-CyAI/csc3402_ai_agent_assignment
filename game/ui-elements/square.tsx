'use client'

import SquareType from "@/types/square_type";
import PieceType from "@/types/piece_type";
// import PieceType from "@/types/piece";
import Piece from "./piece";
import { useSelector, useDispatch } from "react-redux";
import { updateFromSquare, updateToSquare, fromSquareSelected, fromSquareDeselected, toSquareSelected, toSquareDeselected } from "@/redux/squareSlice";

export default function Square(props: { id: string, color: string, onlick: Function, initialState: SquareType, keyValue: number }) {
    let squaresState = useSelector(state => state.squares)

    let keyValue = 0
    if (props.keyValue == null) {
        keyValue = props.keyValue
    }

    let pieceInfo: PieceType = props.initialState.piece as PieceType

    let piece = props.initialState.occupied ? <Piece info={pieceInfo} /> : <></>;

    return (
        <div key={keyValue} id={props.id} className={`${props.color} w-8 h-8 square`}
            onClick={() => {
                // props.onlick()
                alert(`clicked square is located at ${props.initialState.coordinates}`)
                console.log("squares' state is", squaresState)
            }}
        >
            {piece}
        </div>
    );
}
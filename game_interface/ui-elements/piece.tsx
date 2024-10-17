import PieceType from "@/types/piece_type";
import { sqrColor1 } from "@/contants";

export default function Piece(props: { info: PieceType }) {
    let title = props.info.type == "man" ? "man" : "king"

    let textColor = props.info.color == sqrColor1 ? "text-black" : "text-white"

    return (
        <div className={`rounded piece ${props.info.color}`}>
            <p className={`${textColor} piece-title`}>{title}</p>
        </div>
    );
}
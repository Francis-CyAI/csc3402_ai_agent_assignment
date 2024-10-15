import Piece from "@/types/piece";

export default function piece(props: { info: Piece}) {
    let title = props.info.type == "man" ? "man" : "king"
    return (
        <div className={`rounded piece ${props.info.color}`}>
            <p className="piece-title">{title}</p>
        </div>
    );
}
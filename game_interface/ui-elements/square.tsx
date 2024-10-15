'use client'

export default function Square(props: { id: string, color: string, onlick: Function}) {
    return (
        <div id={props.id} className={`${props.color} w-8 h-8`}
            onClick={() => {
                props.onlick
            }}
        >
        </div>
    );
}
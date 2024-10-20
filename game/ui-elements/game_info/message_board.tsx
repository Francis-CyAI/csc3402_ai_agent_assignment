'use client'

import { useSelector } from "react-redux";

export default function MessageBoard() {
    let messageObject = useSelector(state => state.message)
    return (
        <div>
            {messageObject.message}
        </div>
    )
}
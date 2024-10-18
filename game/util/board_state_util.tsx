import { useSelector, useDispatch } from "react-redux";
import { updateBoard } from "@/redux/boardSlice";
import { BoardStateType } from "@/types/board_state_type";
import exp from "constants";


export function ReplaceUpdateBoardSate(props: { newBoardState: BoardStateType  }) {
    const dispatch = useDispatch()
    dispatch(updateBoard(props.newBoardState))
    return <></>
}
import Board from "@/ui-elements/board";
import InfoBar from "@/ui-elements/game_info/info_bar";

export default function PlayingPage() {
    return (
        <>
            <div className="flex items-center justify-center w-screen h-20 p-2">
                <InfoBar />
            </div>
            <div className="flex items-center justify-center h-screen bg-gray-800 mt-36">
                <Board />
            </div>
        </>
    );
}

import ScoreBoard from "./score_board";
import PlayerTurnIndicator from "./player_turn_indicator";

export default function InfoBar() {
    return(
        <div className="pv-4">
            <ScoreBoard />
            <div className="space-small"></div>
            <PlayerTurnIndicator />
        </div>
    )
}
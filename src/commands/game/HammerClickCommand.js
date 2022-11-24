import { lego } from "@armathai/lego";
import { GameState } from "../../configs/Constants";
import { hideHintCommand } from "../hint/HideHintCommand";
import { stopHintVisibilityTimerCommand } from "../hint/StopHintVisibilityTimerCommand";
import { setGameStateCommand } from "./SetGameStateCommand";

export const hammerClickCommand = () => {
    lego.command
        .payload(GameState.ChooseStairType)
        .execute(setGameStateCommand)
        .execute(hideHintCommand, stopHintVisibilityTimerCommand);
};

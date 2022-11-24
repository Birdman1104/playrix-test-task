import { lego } from "@armathai/lego";
import { GameState } from "../../configs/Constants";
import { delayRunnable } from "../../Utils";
import { setGameStateCommand } from "./SetGameStateCommand";

export const optionHideCompleteCommand = () => {
    delayRunnable(1, () => {
        lego.command.payload(GameState.CTA).execute(setGameStateCommand);
    });
};

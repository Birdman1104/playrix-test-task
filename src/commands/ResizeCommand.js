import { lego } from "@armathai/lego";
import { gameShouldShowHintGuard } from "../guards/GameShouldShowHintGuard";
import { resetHintTimerCommand } from "./hint/ResetHintTimerCommand";

export const onResizeCommand = () => {
    lego.command
        //
        .guard(gameShouldShowHintGuard)
        .execute(resetHintTimerCommand);
};

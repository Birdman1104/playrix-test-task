import { lego } from "@armathai/lego";
import { hintModelGuard } from "../guards/HintModelGuard";
import { hideHintCommand } from "./hint/HideHintCommand";
import { startHintVisibilityTimerCommand } from "./hint/StartHintVisibilityTimerCommand";
import { stopHintVisibilityTimerCommand } from "./hint/StopHintVisibilityTimerCommand";

export const onResizeCommand = () => {
    lego.command
        //
        .guard(hintModelGuard)
        .execute(hideHintCommand)
        .execute(stopHintVisibilityTimerCommand)
        .execute(startHintVisibilityTimerCommand);
};

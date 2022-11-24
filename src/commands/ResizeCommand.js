import { lego } from "@armathai/lego";
import { hintModelGuard } from "../guards/HintModelGuard";
import { hideHintCommand } from "./HideHintCommand";
import { startHintVisibilityTimerCommand } from "./StartHintVisibilityTimerCommand";
import { stopHintVisibilityTimerCommand } from "./StopHintVisibilityTimerCommand";

export const onResizeCommand = () => {
    lego.command
        //
        .guard(hintModelGuard)
        .execute(hideHintCommand)
        .execute(stopHintVisibilityTimerCommand)
        .execute(startHintVisibilityTimerCommand);
};

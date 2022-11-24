import { lego } from "@armathai/lego";
import { hintModelGuard } from "../../guards/HintModelGuard";
import { hideHintCommand } from "./HideHintCommand";
import { startHintVisibilityTimerCommand } from "./StartHintVisibilityTimerCommand";
import { stopHintVisibilityTimerCommand } from "./StopHintVisibilityTimerCommand";

export const resetHintTimerCommand = () => {
    lego.command
        //
        .guard(hintModelGuard)
        .execute(hideHintCommand)
        //
        .guard(hintModelGuard)
        .execute(stopHintVisibilityTimerCommand)
        //
        .guard(hintModelGuard)
        .execute(startHintVisibilityTimerCommand);
};

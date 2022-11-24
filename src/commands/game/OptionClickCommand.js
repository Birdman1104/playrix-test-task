import { lego } from "@armathai/lego";
import { hintModelGuard } from "../../guards/HintModelGuard";
import Head from "../../models/HeadModel";
import { destroyHintModelCommand } from "../hint/DestroyHintModelCommand";
import { hideHintCommand } from "../hint/HideHintCommand";
import { stopHintVisibilityTimerCommand } from "../hint/StopHintVisibilityTimerCommand";

export const optionClickCommand = (type) => {
    Head.gameModel.setStairType(type);
    lego.command
        .guard(hintModelGuard)
        .execute(hideHintCommand)
        .guard(hintModelGuard)
        .execute(stopHintVisibilityTimerCommand)
        .guard(hintModelGuard)
        .execute(destroyHintModelCommand);
};

import { lego } from "@armathai/lego";
import { hintModelGuard } from "../../guards/HintModelGuard";
import { destroyHintModelCommand } from "../hint/DestroyHintModelCommand";
import { hideHintCommand } from "../hint/HideHintCommand";
import { setStairTypeCommand } from "./SetStairTypeCommand";

export const optionClickCommand = (type) => {
    lego.command
        // set stair type
        .payload(type)
        .execute(setStairTypeCommand)

        // stop and remove hint
        .guard(hintModelGuard)
        .execute(hideHintCommand)
        .guard(hintModelGuard)
        .execute(destroyHintModelCommand);
};

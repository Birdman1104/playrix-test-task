import { lego } from "@armathai/lego";
import { setHintVisibleCommand } from "./SetHintVisibleCommand";

export const hideHintCommand = () => {
    lego.command.payload(false).execute(setHintVisibleCommand);
};

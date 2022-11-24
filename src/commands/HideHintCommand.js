import { lego } from "@armathai/lego";
import { setHintVisibleCommand } from "./SetHintVisibleCommand";

export function hideHintCommand() {
    lego.command.payload(false).execute(setHintVisibleCommand);
}

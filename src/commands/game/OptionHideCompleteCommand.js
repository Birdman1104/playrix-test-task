import { lego } from "@armathai/lego";
import { GameState } from "../../configs/Constants";
import { setGameStateCommand } from "./SetGameStateCommand";

export const optionHideCompleteCommand = () => {
    lego.command.payload(GameState.CTA).execute(setGameStateCommand);
};

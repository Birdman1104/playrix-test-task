import { lego } from "@armathai/lego";
import { GameState } from "../configs/Constants";
import { setGameStateCommand } from "./SetGameStateCommand";

export const optionSelectedCommand = () => {
    lego.command.payload(GameState.ChoiceConfirmation).execute(setGameStateCommand);
};

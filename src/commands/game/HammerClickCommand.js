import { lego } from "@armathai/lego";
import { GameState } from "../../configs/Constants";
import { setGameStateCommand } from "./SetGameStateCommand";

export const hammerClickCommand = () => {
    lego.command.payload(GameState.ChooseStairType).execute(setGameStateCommand);
};

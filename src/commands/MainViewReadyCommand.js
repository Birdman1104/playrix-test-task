import { lego } from "@armathai/lego";
import { GameState } from "../configs/Constants";
import Head from "../models/HeadModel";
import { setGameStateCommand } from "./game/SetGameStateCommand";
import { initHeadModelCommand } from "./InitHeadModelCommand";

const initGameModelCommand = () => {
    Head.initGameModel();
};

const initHintModelCommand = () => {
    Head.initHint();
};

export const onMainViewReadyCommand = () => {
    lego.command
        //
        .execute(initHeadModelCommand)
        .execute(initHintModelCommand)
        .execute(initGameModelCommand);

    lego.command.payload(GameState.ClickOnHammer).execute(setGameStateCommand);
};

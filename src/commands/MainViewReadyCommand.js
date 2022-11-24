import { lego } from "@armathai/lego";
import { GameState } from "../configs/Constants";
import Head from "../models/HeadModel";
import { delayRunnable } from "../Utils";
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

    delayRunnable(1, () => {
        lego.command.payload(GameState.ClickOnHammer).execute(setGameStateCommand);
    });
};

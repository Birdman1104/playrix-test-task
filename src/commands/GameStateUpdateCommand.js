import { GameState } from "../configs/Constants";
import Head from "../models/HeadModel";

export const gameStateUpdateCommand = (state) => {
    switch (state) {
        case GameState.ClickOnHammer:
            Head.hint.startVisibilityTimer();
            break;
        case GameState.ChooseStairType:
            Head.gameModel.initOptions();
            break;
        case GameState.Idle:
            break;

        default:
            break;
    }
};

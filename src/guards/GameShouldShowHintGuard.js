import { GameState } from "../configs/Constants";
import Head from "../models/HeadModel";

export const gameShouldShowHintGuard = () => {
    return Head.gameModel.state === GameState.ClickOnHammer || Head.gameModel.state === GameState.ChooseStairType;
};

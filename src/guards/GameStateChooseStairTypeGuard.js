import { GameState } from "../configs/Constants";
import Head from "../models/HeadModel";

export const gameStateChooseStairTypeGuard = () => {
    return Head.gameModel.state === GameState.ChooseStairType;
};

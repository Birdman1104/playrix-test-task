import { GameState } from "../configs/Constants";
import Head from "../models/HeadModel";

export const GameStateOnHammerClickGuard = () => {
    return Head.gameModel.state === GameState.ClickOnHammer;
};

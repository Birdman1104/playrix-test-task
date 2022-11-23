import { BoardState } from "../configs/Constants";
import Head from "../models/HeadModel";

export const boardStateUpdateCommand = (state) => {
    switch (state) {
        case BoardState.ClickOnHammer:
            break;
        case BoardState.ChooseStairType:
            Head.gameModel.board.initOptions();
            break;
        case BoardState.Idle:
            break;

        default:
            break;
    }
};

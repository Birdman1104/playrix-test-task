import { BoardState } from "../configs/Constants";
import Head from "../models/HeadModel";

export const hammerClickCommand = () => {
    Head.gameModel.board.state = BoardState.ChooseStairType;
};

import Head from "../models/HeadModel";

export const optionClickCommand = (type) => {
    Head.gameModel.board.setStairType(type);
};

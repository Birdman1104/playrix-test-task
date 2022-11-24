import Head from "../models/HeadModel";

export const setGameStateCommand = (state) => {
    Head.gameModel.state = state;
};

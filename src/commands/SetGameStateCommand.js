import Head from "../models/HeadModel";

export const setGameStateCommand = (state) => {
    console.warn(state);
    Head.gameModel.state = state;
};

import Head from "../../models/HeadModel";

export const setStairTypeCommand = (type) => {
    Head.gameModel.setStairType(type);
};

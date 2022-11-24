import Head from "../../models/HeadModel";

export const optionClickCommand = (type) => {
    Head.gameModel.setStairType(type);
};

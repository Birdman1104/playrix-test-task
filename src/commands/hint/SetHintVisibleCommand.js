import Head from "../../models/HeadModel";

export const setHintVisibleCommand = (value) => {
    Head.hint.visible = value;
};

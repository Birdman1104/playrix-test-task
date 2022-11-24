import Head from "../../models/HeadModel";

export const stopHintVisibilityTimerCommand = () => {
    Head.hint.stopVisibilityTimer();
};

import { lego } from "@armathai/lego";
import { initHeadModelCommand } from "./InitHeadModelCommand";

export const onMainViewReadyCommand = () => {
    lego.command.execute(initHeadModelCommand);
};

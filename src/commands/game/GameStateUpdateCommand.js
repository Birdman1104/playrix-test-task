import { lego } from "@armathai/lego";
import { gameStateChooseStairTypeGuard } from "../../guards/GameStateChooseStairTypeGuard";
import { GameStateOnHammerClickGuard } from "../../guards/GameStateOnHammerClickGuard";
import { resetHintTimerCommand } from "../hint/ResetHintTimerCommand";
import { initOptionsCommand } from "./InitOptionsCommand";

export const gameStateUpdateCommand = () => {
    lego.command
        // GameState.ClickOnHammer
        .guard(GameStateOnHammerClickGuard)
        .execute(resetHintTimerCommand)

        // GameState.ChooseStairType
        .guard(gameStateChooseStairTypeGuard)
        .execute(initOptionsCommand)
        .guard(gameStateChooseStairTypeGuard)
        .execute(resetHintTimerCommand);
};

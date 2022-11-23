import { lego } from "@armathai/lego";
import { MainGameEvents } from "../events/MainEvents";
import { BoardModelEvents } from "../events/ModelEvents";
import { GameViewEvent } from "../events/ViewEvents";
import { boardStateUpdateCommand } from "./BoardStateUpdateCommand";
import { hammerClickCommand } from "./HammerClickCommand";
import { onMainViewReadyCommand } from "./MainViewReadyCommand";
import { optionClickCommand } from "./OptionClickCommand";

export const mapCommands = () => {
    EventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unmapCommands = () => {
    EventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

export const EventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: onMainViewReadyCommand,
    },
    {
        event: GameViewEvent.OptionClick,
        command: optionClickCommand,
    },
    {
        event: GameViewEvent.HammerClick,
        command: hammerClickCommand,
    },
    {
        event: BoardModelEvents.StateUpdate,
        command: boardStateUpdateCommand,
    },
]);

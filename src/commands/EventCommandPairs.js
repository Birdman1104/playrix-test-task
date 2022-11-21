import { lego } from "@armathai/lego";
import { MainGameEvents } from "../events/MainEvents";
import { GameViewEvent } from "../events/ViewEvents";
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
]);

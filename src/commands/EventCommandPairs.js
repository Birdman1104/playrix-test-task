import { lego } from "@armathai/lego";
import { MainGameEvents } from "../events/MainEvents";
import { onMainViewReadyCommand } from "./MainViewReadyCommand";

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
]);

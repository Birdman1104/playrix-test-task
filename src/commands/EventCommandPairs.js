import { lego } from "@armathai/lego";
import { MainGameEvents, WindowEvent } from "../events/MainEvents";
import { GameModelEvents } from "../events/ModelEvents";
import { GameViewEvent } from "../events/ViewEvents";
import { gameStateUpdateCommand } from "./GameStateUpdateCommand";
import { hammerClickCommand } from "./HammerClickCommand";
import { onMainViewReadyCommand } from "./MainViewReadyCommand";
import { optionClickCommand } from "./OptionClickCommand";
import { optionHideCompleteCommand } from "./OptionHideCompleteCommand";
import { optionSelectedCommand } from "./OptionSelectedCommand";
import { onResizeCommand } from "./ResizeCommand";

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
        event: WindowEvent.Resize,
        command: onResizeCommand,
    },
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
        event: GameModelEvents.StateUpdate,
        command: gameStateUpdateCommand,
    },
    {
        event: GameViewEvent.OptionSelected,
        command: optionSelectedCommand,
    },
    {
        event: GameViewEvent.OptionHideComplete,
        command: optionHideCompleteCommand,
    },
]);

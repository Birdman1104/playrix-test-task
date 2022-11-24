import { lego } from "@armathai/lego";
import { MainGameEvents } from "../events/MainEvents";
import { GameModelEvents } from "../events/ModelEvents";
import { GameViewEvent } from "../events/ViewEvents";
import { gameStateUpdateCommand } from "./game/GameStateUpdateCommand";
import { hammerClickCommand } from "./game/HammerClickCommand";
import { optionClickCommand } from "./game/OptionClickCommand";
import { optionHideCompleteCommand } from "./game/OptionHideCompleteCommand";
import { optionSelectedCommand } from "./game/OptionSelectedCommand";
import { onMainViewReadyCommand } from "./MainViewReadyCommand";
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
        event: MainGameEvents.Resize,
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

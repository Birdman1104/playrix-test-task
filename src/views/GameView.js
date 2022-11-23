import { lego } from "@armathai/lego";
import { PixiGrid } from "@armathai/pixi-grid";
import { GameState } from "../configs/Constants";
import { getGameViewGridConfig } from "../configs/grid-configs/GameViewGridConfig";
import { GameModelEvents, StairOptionModelEvents } from "../events/ModelEvents";
import { GameViewEvent, OptionsEvent, StairsEvent } from "../events/ViewEvents";
import { OptionView } from "./OptionView";
import { StairView } from "./StairView";

export class GameView extends PixiGrid {
    #options = []; // OptionView[]
    #stair; // StairView

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StairTypeUpdate, this.#onStairTypeUpdate, this)
            .on(GameModelEvents.StateUpdate, this.#onGameStateUpdate, this)
            .on(StairOptionModelEvents.SelectedUpdate, this.#onOptionSelectedUpdate, this)
            .on(GameModelEvents.OptionsUpdate, this.#onOptionsUpdate, this);

        this.#build();
    }

    get name() {
        return "GameView";
    }

    getGridConfig() {
        return getGameViewGridConfig();
    }

    rebuild() {
        super.rebuild(this.getGridConfig());
    }

    getOptionByUUID(uuid) {
        return this.#options.find((o) => o.uuid === uuid);
    }

    #build() {
        this.#buildDefaultStairs();
    }

    #onStairTypeUpdate(newType, oldType) {
        oldType && this.#stair.updateType(newType);
    }

    #buildDefaultStairs() {
        this.#stair = new StairView();
        this.#stair.on(StairsEvent.HammerIconClick, () => {
            lego.event.emit(GameViewEvent.HammerClick);
        });
        this.setChild("stair", this.#stair);
    }

    #onOptionsUpdate(newOptions, oldOptions) {
        oldOptions?.length === 0 ? this.#buildOptions(newOptions) : this.#destroyOptions();
    }

    #buildOptions(optionsConfig) {
        this.#options = optionsConfig.map((option, i) => {
            const optionView = new OptionView(option);
            optionView.on(OptionsEvent.OptionClick, (type) => lego.event.emit(GameViewEvent.OptionClick, type));
            optionView.on(OptionsEvent.OkButtonClick, () => lego.event.emit(GameViewEvent.OptionSelected));
            this.setChild(`option_${i + 1}`, optionView);
            return optionView;
        });
    }

    #destroyOptions() {
        this.#options.forEach((option) => option.destroy());
        this.#options = [];
    }

    #onOptionSelectedUpdate(newValue, oldValue, uuid) {
        this.getOptionByUUID(uuid).setSelected(newValue);
    }

    #onGameStateUpdate(newState, oldState) {
        switch (newState) {
            case GameState.ClickOnHammer:
                this.#stair.showHammer();
                break;
            case GameState.ChooseStairType:
                // this.#buildOptions();
                break;
            case GameState.ChoiceConfirmation:
                this.#hideOptions();
                break;

            default:
                break;
        }
    }

    #hideOptions() {
        // GSAP
        this.#options.forEach((o) => o.hide());
        lego.event.emit(GameViewEvent.OptionHideComplete);
    }
}

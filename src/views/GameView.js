import { lego } from "@armathai/lego";
import { PixiGrid } from "@armathai/pixi-grid";
import { BoardState } from "../configs/Constants";
import { getGameViewGridConfig } from "../configs/grid-configs/GameViewGridConfig";
import { BoardModelEvents, StairOptionModelEvents } from "../events/ModelEvents";
import { GameViewEvent } from "../events/ViewEvents";
import { OptionView } from "./OptionView";
import { StairView } from "./StairView";

export class GameView extends PixiGrid {
    #options = []; // OptionView[]
    #stair; // StairView

    constructor() {
        super();

        lego.event
            .on(BoardModelEvents.StairTypeUpdate, this.#onStairTypeUpdate, this)
            .on(BoardModelEvents.StateUpdate, this.#onBoardStateUpdate, this)
            .on(StairOptionModelEvents.SelectedUpdate, this.#onOptionSelectedUpdate, this)
            .on(BoardModelEvents.OptionsUpdate, this.#onOptionsUpdate, this);

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
        this.#stair.on("onHammerClick", () => {
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
            optionView.on("OptionClick", (type) => {
                lego.event.emit(GameViewEvent.OptionClick, type);
            });
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

    #onBoardStateUpdate(newState, oldState) {
        switch (newState) {
            case BoardState.ClickOnHammer:
                this.#stair.showHammer();
                break;
            case BoardState.ChooseStairType:
                // this.#buildOptions();
                break;
            case BoardState.Idle:
                break;

            default:
                break;
        }
    }

    #showHammer() {
        //
    }
}

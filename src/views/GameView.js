import { lego } from "@armathai/lego";
import { PixiGrid } from "@armathai/pixi-grid";
import { getGameViewGridConfig } from "../configs/grid-configs/GameViewGridConfig";
import { getStairImageConfig } from "../configs/SpriteConfigs";
import { StairType } from "../configs/StairsOptionsConfig";
import { BoardModelEvents, StairOptionModelEvents } from "../events/ModelEvents";
import { GameViewEvent } from "../events/ViewEvents";
import { makeSprite } from "../Utils";
import { OptionView } from "./OptionView";

export class GameView extends PixiGrid {
    #options = []; // OptionView[]

    constructor() {
        super();

        lego.event
            .on(BoardModelEvents.StairTypeUpdate, this.#onStairTypeUpdate, this)
            .on(StairOptionModelEvents.SelectedUpdate, this.#onOptionSelectedUpdate, this)
            .on(BoardModelEvents.OptionsUpdate, this.#onOptionsUpdate, this);

        // this.#build();
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

    #onStairTypeUpdate(newType, oldType) {
        oldType ? this.#updateStairs(newType) : this.#buildDefaultStairs();
    }

    #updateStairs(newType) {
        console.warn(newType);
    }

    #buildDefaultStairs() {
        this._defaultStair = makeSprite(getStairImageConfig(StairType.Default));
        this.setChild("stair", this._defaultStair);
    }

    #onOptionsUpdate(newOptions, oldOptions) {
        oldOptions?.length === 0 ? this.#createOptions(newOptions) : this.#destroyOptions();
    }

    #createOptions(optionsConfig) {
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
        const option = this.getOptionByUUID(uuid);
        option.setSelected(newValue);
    }
}

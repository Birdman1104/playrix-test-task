import { lego } from "@armathai/lego";
import { PixiGrid } from "@armathai/pixi-grid";
import { getGameViewGridConfig } from "../configs/grid-configs/GameViewGridConfig";
import { getStairImageConfig } from "../configs/SpriteConfigs";
import { StairType } from "../configs/StairsOptionsConfig";
import { BoardModelEvents } from "../events/ModelEvents";
import { makeSprite } from "../Utils";

export class GameView extends PixiGrid {
    constructor() {
        super();

        lego.event.on(BoardModelEvents.StairsUpdate, this.#onStairUpdate, this);

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

    #onStairUpdate(newType, oldType) {
        oldType ? this.#updateStairs() : this.#buildDefaultStairs();
    }

    #updateStairs() {
        // const gr = getGr(0x456789);
        // this.setChild("board", gr);
    }

    #buildDefaultStairs() {
        this._defaultStair = makeSprite(getStairImageConfig(StairType.Default));
        // const gr = getGr(0x456789);
        this.setChild("stair", this._defaultStair);
    }
}

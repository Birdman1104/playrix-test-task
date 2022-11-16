import { PixiGrid } from "@armathai/pixi-grid";
import { getGameViewGridConfig } from "../configs/grid-configs/GameViewGridConfig";
import { getGr } from "./BackgroundView";

export class GameView extends PixiGrid {
    constructor() {
        super();
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

    #build() {
        const gr = getGr(0x456789);
        this.setChild("board", gr);
    }
}

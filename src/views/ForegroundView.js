import { PixiGrid } from "@armathai/pixi-grid";
import { getForegroundViewGridConfig } from "../configs/grid-configs/ForegroundViewGridConfig";
import { getGr } from "./BackgroundView";

export class ForegroundView extends PixiGrid {
    constructor() {
        super();
        this.#build();
    }

    get name() {
        return "ForegroundView";
    }

    getGridConfig() {
        return getForegroundViewGridConfig();
    }

    rebuild() {
        super.rebuild(this.getGridConfig());
    }

    #build() {
        const gr = getGr(0xff0000);
        this.setChild("tutorial", gr);
    }
}

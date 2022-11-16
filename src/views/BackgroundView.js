import { PixiGrid } from "@armathai/pixi-grid";
import * as PIXI from "pixi.js";
import { getBackgroundGridConfig } from "../configs/grid-configs/BackgroundGridConfig";

export class BackgroundView extends PixiGrid {
    constructor() {
        super();

        this.#build();
    }

    getGridConfig() {
        return getBackgroundGridConfig();
    }

    rebuild() {
        super.rebuild(this.getGridConfig());
    }

    #build() {
        const gr = getGr(0x123456);
        this.setChild("bg", gr);
    }
}

export function getGr(color = 0x919191, alpha = 1) {
    const gr = new PIXI.Graphics();
    gr.interactive = true;
    gr.beginFill(color, alpha);
    gr.drawRect(0, 0, 10, 10);
    gr.endFill();
    return gr;
}

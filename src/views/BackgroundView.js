import { PixiGrid } from "@armathai/pixi-grid";
import * as PIXI from "pixi.js";
import { getBackgroundGridConfig } from "../configs/grid-configs/BackgroundGridConfig";
import { getRoomImageConfig } from "../configs/SpriteConfigs";
import { makeSprite } from "../Utils";

export class BackgroundView extends PixiGrid {
    #room;
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
        this.#buildRoom();
    }

    #buildRoom() {
        this.#room = makeSprite(getRoomImageConfig());
        this.setChild("bg", this.#room);
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

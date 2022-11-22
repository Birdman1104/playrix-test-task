import * as PIXI from "pixi.js";
import { getPCTAImageConfig } from "../configs/SpriteConfigs";
import { makeSprite } from "../Utils";

export class PCTAView extends PIXI.Container {
    #button; // Sprite

    constructor() {
        super();

        this.#build();
    }

    #build() {
        this.#button = makeSprite(getPCTAImageConfig());
        this.addChild(this.#button);
    }
}

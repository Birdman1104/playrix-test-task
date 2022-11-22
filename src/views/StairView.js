import * as PIXI from "pixi.js";
import { getStairImageConfig } from "../configs/SpriteConfigs";
import { StairType } from "../configs/StairsOptionsConfig";
import { makeSprite } from "../Utils";

export class StairView extends PIXI.Container {
    #sprite;
    constructor() {
        super();

        this.#build();
    }

    // TODO Choose a better logic
    updateType(type) {
        this.#sprite.destroy();
        this.#sprite = makeSprite(getStairImageConfig(type));
        this.addChild(this.#sprite);
    }

    #build() {
        this.#sprite = makeSprite(getStairImageConfig(StairType.Default));
        this.addChild(this.#sprite);
    }
}

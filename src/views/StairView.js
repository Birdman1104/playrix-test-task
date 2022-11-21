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

    #build() {
        this.#sprite = makeSprite(getStairImageConfig(StairType.Default));
        this.addChild(this.#sprite);
    }
}

import * as PIXI from "pixi.js";
import { getHandImageConfig } from "../configs/SpriteConfigs";
import { makeSprite } from "../Utils";

export class HintView extends PIXI.Container {
    #hand; // Sprite

    constructor() {
        super();

        this.#build();
    }

    get name() {
        return "HintView";
    }

    #build() {
        this.#hand = makeSprite(getHandImageConfig());
        this.addChild(this.#hand);
        // const gr = getGr(0x789abc);
        // this.setChild("p_cta", gr);
    }
}

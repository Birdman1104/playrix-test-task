import * as PIXI from "pixi.js";
import { getHandImageConfig } from "../configs/SpriteConfigs";
import { getDisplayObjectByProperty, makeSprite } from "../Utils";

export class HintView extends PIXI.Container {
    #hand; // Sprite

    constructor() {
        super();

        this.#build();
    }

    get name() {
        return "HintView";
    }

    show() {
        const stairView = getDisplayObjectByProperty("name", "StairView");
        this.#hand.position.copyFrom(this.toLocal(stairView.getHintPosition()));
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    #build() {
        this.#hand = makeSprite(getHandImageConfig());
        this.visible = false;
        this.addChild(this.#hand);
        // const gr = getGr(0x789abc);
        // this.setChild("p_cta", gr);
    }
}

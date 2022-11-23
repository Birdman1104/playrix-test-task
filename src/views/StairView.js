import * as PIXI from "pixi.js";
import { getHammerIconImageConfig, getStairImageConfig } from "../configs/SpriteConfigs";
import { StairType } from "../configs/StairsOptionsConfig";
import { makeSprite } from "../Utils";

export class StairView extends PIXI.Container {
    #stairs; // Sprite
    #hammerIcon; //Sprite

    constructor() {
        super();

        this.#build();
    }

    showHammer() {
        // GSAP
        // setTimeout(() => {
        this.#hammerIcon.visible = true;
        this.#hammerIcon.alpha = 1;
        this.#hammerIcon.scale.set(1, 1);
        // }, 1000);
    }

    updateType(type) {
        // GSAP
        this.#stairs.destroy();
        this.#stairs = makeSprite(getStairImageConfig(type));
        this.addChild(this.#stairs);
    }

    #build() {
        this.#buildStairs();
        this.#buildHammer();
    }

    #buildStairs() {
        this.#stairs = makeSprite(getStairImageConfig(StairType.Default));
        this.addChild(this.#stairs);
    }

    #buildHammer() {
        this.#hammerIcon = makeSprite(getHammerIconImageConfig());
        this.#hammerIcon.visible = false;
        this.#hammerIcon.alpha = 0;
        this.#hammerIcon.scale.set(0, 0);
        this.#hammerIcon.interactive = true;
        this.#hammerIcon.on("pointerdown", this.#hideHammer, this);
        this.addChild(this.#hammerIcon);
    }

    async #hideHammer() {
        // GSAP
        // this.#hammerIcon.visible = true;
        // this.#hammerIcon.alpha = 0.5;
        // this.#hammerIcon.scale.set(0.5, 0.5);
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        this.#hammerIcon.alpha = 0;
        this.#hammerIcon.scale.set(0, 0);
        this.emit("onHammerClick");
        //         resolve();
        //     }, 1000);
        // });
    }
}

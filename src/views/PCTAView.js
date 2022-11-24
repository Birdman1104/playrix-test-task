import gsap from "gsap";
import * as PIXI from "pixi.js";
import { getPCTAImageConfig } from "../configs/SpriteConfigs";
import { makeSprite, openPlayMarketPage } from "../Utils";

export class PCTAView extends PIXI.Container {
    #button; // Sprite

    constructor() {
        super();

        this.#build();
    }

    getBounds() {
        return new PIXI.Rectangle(-182, -62, 364, 124);
    }

    #build() {
        this.#button = makeSprite(getPCTAImageConfig());
        this.#button.interactive = true;
        this.#button.scale.set(0.7);
        this.#button.on("pointerdown", () => openPlayMarketPage());
        gsap.to(this.#button.scale, { x: 1, y: 1, yoyo: true, repeat: -1, ease: "none", duration: 1 });
        this.addChild(this.#button);
    }
}

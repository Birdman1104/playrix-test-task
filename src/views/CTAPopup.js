import gsap from "gsap";
import * as PIXI from "pixi.js";
import { getCTAPopupImageConfig } from "../configs/SpriteConfigs";
import { makeSprite } from "../Utils";

export class CTAPopup extends PIXI.Container {
    #popup; // Sprite

    constructor() {
        super();
        this.#build();
    }

    getBounds() {
        // const size from background image
        // needs for proper scaling in cell
        return new PIXI.Rectangle(-305, -197, 610, 395);
    }

    show() {
        this.visible = true;
        gsap.to(this.#popup.scale, { x: 1, y: 1, ease: "elastic.inOut(1, 0.75)" });
    }

    #build() {
        this.#buildPopup();
        this.visible = false;
    }

    #buildPopup() {
        this.#popup = makeSprite(getCTAPopupImageConfig());
        this.#popup.scale = 0;
        this.addChild(this.#popup);
    }
}

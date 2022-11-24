import * as PIXI from "pixi.js";
import { GameState } from "../configs/Constants";
import { getPCTAImageConfig } from "../configs/SpriteConfigs";
import Head from "../models/HeadModel";
import { makeSprite } from "../Utils";

export class PCTAView extends PIXI.Container {
    #button; // Sprite

    constructor() {
        super();

        this.#build();
    }

    #build() {
        this.#button = makeSprite(getPCTAImageConfig());
        this.#button.interactive = true;
        this.#button.on("pointerdown", () => {
            Head.gameModel.state = GameState.CTA;
        });
        this.addChild(this.#button);
    }
}

import * as PIXI from "pixi.js";
import { getPCTAImageConfig } from "../configs/SpriteConfigs";
import { makeSprite, openPlayMarketPage } from "../Utils";

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
            openPlayMarketPage();
            // window.open("https://play.google.com/store/apps/dev?id=6598096594674427568&hl=en&gl=US&pli=1", "_self");
            // Head.gameModel.state = GameState.CTA;
        });
        this.addChild(this.#button);
    }
}

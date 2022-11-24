import { PixiGrid } from "@armathai/pixi-grid";
import { getForegroundViewGridConfig } from "../configs/grid-configs/ForegroundViewGridConfig";
import { getLogoImageConfig } from "../configs/SpriteConfigs";
import { makeSprite } from "../Utils";
import { PCTAView } from "./PCTAView";

export class ForegroundView extends PixiGrid {
    #logo; // Sprite
    #pcta; // PCTAView

    constructor() {
        super();
        this.#build();
    }

    get name() {
        return "ForegroundView";
    }

    getGridConfig() {
        return getForegroundViewGridConfig();
    }

    rebuild() {
        super.rebuild(this.getGridConfig());
    }

    #build() {
        this.#buildLogo();
        this.#buildPCTA();
    }

    #buildLogo() {
        this.#logo = makeSprite(getLogoImageConfig());
        this.setChild("logo", this.#logo);
    }

    #buildPCTA() {
        this.#pcta = new PCTAView();
        this.setChild("p_cta", this.#pcta);
    }
}

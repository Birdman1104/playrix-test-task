import { PixiGrid } from "@armathai/pixi-grid";
import { getCTAViewGridConfig } from "../configs/grid-configs/CTAViewGridConfig";
import { getGr } from "./BackgroundView";

export class CTAView extends PixiGrid {
    constructor() {
        super();
        this.#build();
    }

    get name() {
        return "CTAView";
    }

    getGridConfig() {
        return getCTAViewGridConfig();
    }

    rebuild() {
        super.rebuild(this.getGridConfig());
    }

    #build() {
        const gr = getGr(0x00fff0, 0.5);
        this.setChild("blocker", gr);
    }
}

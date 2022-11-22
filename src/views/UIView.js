import { PixiGrid } from "@armathai/pixi-grid";
import { getUIViewGridConfig } from "../configs/grid-configs/UIViewGridConfig";

export class UIView extends PixiGrid {
    constructor() {
        super();

        this.#build();
    }

    get name() {
        return "UIView";
    }

    getGridConfig() {
        return getUIViewGridConfig();
    }

    rebuild() {
        super.rebuild(this.getGridConfig());
    }

    #build() {
        // const gr = getGr(0x789abc);
        // this.setChild("p_cta", gr);
    }
}

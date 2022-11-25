import { PixiGrid } from "@armathai/pixi-grid";
import { getUIViewGridConfig } from "../configs/grid-configs/UIViewGridConfig";
import { getDecorImageConfig } from "../configs/SpriteConfigs";
import { makeSprite } from "../Utils";

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
        const plant = makeSprite(getDecorImageConfig("plant_1"));
        this.setChild("plant", plant);
    }
}

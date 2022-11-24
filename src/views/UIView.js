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
        // { name: "plant_2", x: 490, y: -80, scale: 0.9 },
        const plant = makeSprite(getDecorImageConfig("plant_1"));
        this.setChild("plant", plant);
    }
}

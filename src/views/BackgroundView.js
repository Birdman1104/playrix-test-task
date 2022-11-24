import { PixiGrid } from "@armathai/pixi-grid";
import { getBackgroundGridConfig } from "../configs/grid-configs/BackgroundGridConfig";
import { getRoomImageConfig } from "../configs/SpriteConfigs";
import { makeSprite } from "../Utils";

export class BackgroundView extends PixiGrid {
    #room;
    constructor() {
        super();

        this.#build();
    }

    getGridConfig() {
        return getBackgroundGridConfig();
    }

    rebuild() {
        super.rebuild(this.getGridConfig());
    }

    #build() {
        this.#buildRoom();
    }

    #buildRoom() {
        this.#room = makeSprite(getRoomImageConfig());
        this.setChild("bg", this.#room);
    }
}

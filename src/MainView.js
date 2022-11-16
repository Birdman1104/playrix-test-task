import { lego } from "@armathai/lego";
import { PixiGrid } from "@armathai/pixi-grid";
import { getMainViewGridConfig } from "./configs/grid-configs/MainViewGridConfig";
import { MainGameEvents } from "./events/MainEvents";

export class MainView extends PixiGrid {
    constructor() {
        super();

        lego.event.on(MainGameEvents.Resize, this.onResize, this);
        this._build();
    }

    getGridConfig() {
        return getMainViewGridConfig();
    }

    rebuild() {
        super.rebuild(this.getGridConfig());
    }

    onResize() {
        this.rebuild();
    }

    _build() {
        console.warn("build main view");
    }
}

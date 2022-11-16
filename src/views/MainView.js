import { lego } from "@armathai/lego";
import { PixiGrid } from "@armathai/pixi-grid";
import { getMainViewGridConfig } from "../configs/grid-configs/MainViewGridConfig";
import { MainGameEvents } from "../events/MainEvents";
import { BackgroundView } from "./BackgroundView";

export class MainView extends PixiGrid {
    #bgView;
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
        this.setChild("background", (this.#bgView = new BackgroundView()));

        this.#bgView.alpha = 0;
        setTimeout(() => {
            this.rebuild();
            this.onResize();
            this.#bgView.alpha = 1;
        }, 400);
    }
}

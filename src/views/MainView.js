import { lego } from "@armathai/lego";
import { PixiGrid } from "@armathai/pixi-grid";
import { getMainViewGridConfig } from "../configs/grid-configs/MainViewGridConfig";
import { MainGameEvents } from "../events/MainEvents";
import { BackgroundView } from "./BackgroundView";
import { CTAView } from "./CTAView";
import { ForegroundView } from "./ForegroundView";
import { GameView } from "./GameView";
import { UIView } from "./UIView";

export class MainView extends PixiGrid {
    #bgView;
    #gameView;
    #uiView;
    #foregroundView;
    #ctaView;

    constructor() {
        super();

        lego.event.on(MainGameEvents.Resize, this.#onResize, this);
        this.#build();
    }

    getGridConfig() {
        return getMainViewGridConfig();
    }

    rebuild() {
        super.rebuild(this.getGridConfig());
    }

    #onResize() {
        this.rebuild();
    }

    #build() {
        this.setChild("background", (this.#bgView = new BackgroundView()));
        this.setChild("game", (this.#gameView = new GameView()));
        this.setChild("game", (this.#uiView = new UIView()));
        this.setChild("game", (this.#ctaView = new CTAView()));
        this.setChild("game", (this.#foregroundView = new ForegroundView()));

        this.rebuild();
    }
}

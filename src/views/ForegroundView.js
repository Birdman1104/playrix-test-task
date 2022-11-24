import { lego } from "@armathai/lego";
import { PixiGrid } from "@armathai/pixi-grid";
import { getForegroundViewGridConfig } from "../configs/grid-configs/ForegroundViewGridConfig";
import { getLogoImageConfig } from "../configs/SpriteConfigs";
import { GameModelEvents, HeadModelEvents, HintModelEvents } from "../events/ModelEvents";
import { makeSprite } from "../Utils";
import { HintView } from "./HintView";
import { PCTAView } from "./PCTAView";

export class ForegroundView extends PixiGrid {
    #logo; // Sprite
    #hint; // HintView
    #pcta; // PCTAView

    constructor() {
        super();

        lego.event
            .on(HeadModelEvents.HintUpdate, this.#onHintUpdate, this)
            .on(HintModelEvents.VisibleUpdate, this.#onHintVisibleUpdate, this)
            .on(GameModelEvents.StateUpdate, this.#onGameModelStateUpdate, this);
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

    #onHintUpdate(hint) {
        hint ? this.#buildHint() : this.#destroyHint();
    }

    #buildHint() {
        this.#hint = new HintView();
        this.addChild(this.#hint);
    }

    #destroyHint() {
        this.#hint.destroy();
    }

    #buildPCTA() {
        this.#pcta = new PCTAView();
        this.setChild("p_cta", this.#pcta);
    }

    #onHintVisibleUpdate(visible) {
        visible ? this.#hint.show() : this.#hint.hide();
    }

    #onGameModelStateUpdate(state) {
        this.#hint && (this.#hint.gameState = state);
    }
}

import { lego } from "@armathai/lego";
import { PixiGrid } from "@armathai/pixi-grid";
import { GameState } from "../configs/Constants";
import { getCTAViewGridConfig } from "../configs/grid-configs/CTAViewGridConfig";
import { GameModelEvents } from "../events/ModelEvents";
import { getGr } from "./BackgroundView";

export class CTAView extends PixiGrid {
    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.#onGameModelStateUpdate, this);
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
        this.visible = false;
    }

    #onGameModelStateUpdate(newState, oldState) {
        switch (newState) {
            case GameState.CTA:
                this.visible = true;
                break;

            default:
                break;
        }
    }
}

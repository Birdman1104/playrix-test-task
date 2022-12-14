import { lego } from "@armathai/lego";
import { PixiGrid } from "@armathai/pixi-grid";
import gsap from "gsap";
import { GameState } from "../configs/Constants";
import { getCTAViewGridConfig } from "../configs/grid-configs/CTAViewGridConfig";
import { getWellDoneImageConfig } from "../configs/SpriteConfigs";
import { GameModelEvents } from "../events/ModelEvents";
import { getGameBounds, getGr, makeSprite } from "../Utils";
import { CTAPopup } from "./CTAPopup";

export class CTAView extends PixiGrid {
    #wellDone; // Sprite
    #popup; // Sprite
    #blocker; // Graphics

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
        this.#buildBlocker();
        this.#buildWellDone();
        this.#buildPopup();
        this.visible = false;
    }

    #buildBlocker() {
        this.#blocker = getGr(0x0, 0.5);
        this.setChild("blocker", this.#blocker);
    }

    #buildPopup() {
        this.#popup = new CTAPopup();
        this.setChild("popup", this.#popup);
    }

    #buildWellDone() {
        this.#wellDone = makeSprite(getWellDoneImageConfig());
        this.setChild("well_done", this.#wellDone);
    }

    #onGameModelStateUpdate(state) {
        switch (state) {
            case GameState.CTA:
                this.visible = true;
                this.#show();
                break;

            default:
                break;
        }
    }

    #show() {
        this.#showBlocker();
        this.#showWellDone();
    }

    #showBlocker() {
        gsap.from(this.#blocker, { alpha: 0 });
    }

    #showWellDone() {
        const { width, height } = getGameBounds();
        const timeline = gsap.timeline({
            defaults: { duration: 0.75, ease: "elastic.inOut(1, 0.75)" },
            onComplete: () => {
                this.#wellDone.visible = false;
                this.#showPopup();
            },
        });

        timeline.from(this.#wellDone, { x: `-=${width / 2}`, y: `+=${height / 2}`, rotation: -Math.PI / 2 });
        timeline.to(
            this.#wellDone,
            { x: `+=${width / 1.5}`, y: `+=${height / 2}`, rotation: Math.PI / 4, duration: 0.5 },
            2.5,
        );
    }

    #showPopup() {
        this.#popup.show();
    }
}

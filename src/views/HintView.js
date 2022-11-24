import gsap from "gsap";
import * as PIXI from "pixi.js";
import { GameState } from "../configs/Constants";
import { getHandImageConfig } from "../configs/SpriteConfigs";
import { getDisplayObjectByProperty, lp, makeSprite } from "../Utils";

export class HintView extends PIXI.Container {
    // public gameState
    #hand; // Sprite

    constructor() {
        super();

        this.#build();
    }

    get name() {
        return "HintView";
    }

    show() {
        if (this.gameState === GameState.ClickOnHammer) {
            this.#showHintOnHammer();
        } else if (this.gameState === GameState.ChooseStairType) {
            this.#showHintOnOptions();
        }
    }

    hide() {
        gsap.killTweensOf(this.#hand);
        this.#hand.scale.x = 1;
        this.#hand.scale.y = 1;
        this.visible = false;
    }

    #build() {
        this.#hand = makeSprite(getHandImageConfig());
        this.visible = false;
        this.addChild(this.#hand);
    }

    #showHintOnHammer() {
        const stairView = getDisplayObjectByProperty("name", "StairView");
        this.#hand.position.copyFrom(this.toLocal(stairView.getHintPosition()));
        this.visible = true;
        this.#animateHandOnHammer();
    }

    #showHintOnOptions() {
        const gameView = getDisplayObjectByProperty("name", "GameView");
        const pos = gameView.getHintPosition().map((p) => this.toLocal(p));
        this.#hand.position.copyFrom(pos[0]);
        lp(this.#animateHandOnOptionsLandScape, this.#animateHandOnOptionsPortrait).call(this, pos);
    }

    #animateHandOnOptionsLandScape(pos) {
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0, delay: 0, defaults: { ease: "sine.inOut" } });

        pos.forEach(({ x, y }) => {
            timeline.to(this.#hand, { x, y });
            timeline.to(this.#hand, { y: "-=20", yoyo: true, repeat: 1 });
        });

        timeline.to(this.#hand, { x: pos[0].x, y: pos[0].y });
        this.visible = true;
    }

    #animateHandOnOptionsPortrait(pos) {
        this.#hand.scale.y *= -1;
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0, delay: 0, defaults: { ease: "sine.inOut" } });

        pos.forEach(({ x, y }) => {
            timeline.to(this.#hand, { x, y });
            timeline.to(this.#hand, { y: "+=20", yoyo: true, repeat: 1 });
        });

        timeline.to(this.#hand, { x: pos[0].x, y: pos[0].y });
        this.visible = true;
    }

    #animateHandOnHammer() {
        gsap.to(this.#hand, { y: "-=20", duration: 0.75, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }
}

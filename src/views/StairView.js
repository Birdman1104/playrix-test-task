import gsap from "gsap";
import * as PIXI from "pixi.js";
import { getHammerIconImageConfig, getStairImageConfig } from "../configs/SpriteConfigs";
import { StairType } from "../configs/StairsOptionsConfig";
import { StairsEvent } from "../events/ViewEvents";
import { makeSprite } from "../Utils";

export class StairView extends PIXI.Container {
    #stairs; // Sprite
    #hammerIcon; //Sprite
    #stairUpdateAnimation; //gsap timeline
    #hammerShowAnimation; //gsap timeline
    // #hammerHideAnimation; //gsap timeline

    constructor() {
        super();
        this.#build();
    }

    showHammer() {
        this.#hammerIcon.visible = true;
        this.#hammerIcon.alpha = 0;
        // this.#hammerIcon.scale.set(0);

        this.#hammerShowAnimation = gsap.timeline({
            defaults: { duration: 0.5 },
            onComplete: () => (this.#hammerIcon.interactive = true),
        });
        // this.#hammerShowAnimation.to(this.#hammerIcon.scale, { x: 1, y: 1 }, 0);
        this.#hammerShowAnimation.to(this.#hammerIcon, { alpha: 1 }, 0);
        this.#hammerShowAnimation.from(this.#hammerIcon, { y: "-=60", ease: "bounce.out" }, 0);
    }

    updateType(type) {
        this.#stairs.texture = PIXI.Texture.from(getStairImageConfig(type).texture);
        this.#stairUpdate();
    }

    #build() {
        this.#buildStairs();
        this.#buildHammer();
    }

    #buildStairs() {
        this.#stairs = makeSprite(getStairImageConfig(StairType.Default));
        this.addChild(this.#stairs);
    }

    #buildHammer() {
        this.#hammerIcon = makeSprite(getHammerIconImageConfig());
        this.#hammerIcon.visible = false;
        this.#hammerIcon.alpha = 0;
        this.#hammerIcon.on("pointerdown", this.#hideHammer, this);
        this.addChild(this.#hammerIcon);
    }

    #hideHammer() {
        this.#hammerIcon.visible = false;
        this.emit(StairsEvent.HammerIconClick);
        // this.#hammerHideAnimation?.kill();
        // this.#hammerHideAnimation = gsap.timeline({
        //     defaults: { duration: 0.5 },
        //     onComplete: () => {
        //         this.emit(StairsEvent.HammerIconClick);
        //         this.#hammerIcon.visible = false;
        //     },
        // });
        // this.#hammerHideAnimation.to(this.#hammerIcon.scale, { x: 0, y: 0 }, 0);
        // this.#hammerHideAnimation.to(this.#hammerIcon, { alpha: 0 }, 0);
    }

    #stairUpdate() {
        this.#stairs.alpha = 0;
        this.#stairs.y = 0;
        this.#stairUpdateAnimation?.kill();
        this.#stairUpdateAnimation = gsap.timeline({ defaults: { duration: 0.5 } });
        this.#stairUpdateAnimation.to(this.#stairs, { alpha: 1 }, 0);
        this.#stairUpdateAnimation.from(this.#stairs, { y: "-=60" }, 0);
    }
}

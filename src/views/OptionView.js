import * as PIXI from "pixi.js";
import {
    getOKButtonImageConfig,
    getOptionDefaultBackgroundImageConfig,
    getOptionIconImageConfig,
    getOptionSelectedBackgroundImageConfig,
} from "../configs/SpriteConfigs";
import { OptionsEvent } from "../events/ViewEvents";
import { makeSprite } from "../Utils";

export class OptionView extends PIXI.Container {
    #background; // Sprite
    #icon; // Sprite
    #okButton; // Sprite
    #type; // StairType
    #selected; // boolean
    #uuid; // string

    constructor({ type, selected, uuid }) {
        super();
        this.#type = type;
        this.#selected = selected;
        this.#uuid = uuid;
        this.#build();
    }

    get type() {
        return this.#type;
    }

    get uuid() {
        return this.#uuid;
    }

    get selected() {
        return this.#selected;
    }

    getBounds() {
        // const size from background image
        // needs for proper scaling in cell
        return new PIXI.Rectangle(-60, -60, 120, 120);
    }

    setSelected(value) {
        this.#selected = value;
        this.#updateBackground();
        value ? this.#showOKButton() : this.#hideOKButton();
    }

    hide() {
        // GSAP
        this.visible = false;
    }

    #build() {
        this.#buildBackground();
        this.#buildOKButton();
        this.#buildIcon();
    }

    #buildBackground() {
        // GSAP
        this.#background = makeSprite(getOptionDefaultBackgroundImageConfig());
        this.#background.interactive = true;
        this.#background.on("pointerup", () => this.emit(OptionsEvent.OptionClick, this.#type));
        this.addChild(this.#background);
        this.calculateBounds();
    }

    #updateBackground() {
        this.#background.texture = PIXI.Texture.from(
            this.#selected
                ? getOptionSelectedBackgroundImageConfig().texture
                : getOptionDefaultBackgroundImageConfig().texture,
        );
        this.#background.interactive = !this.#selected;
    }

    #buildIcon() {
        this.#icon = makeSprite(getOptionIconImageConfig(this.#type));
        this.#background.addChild(this.#icon);
    }

    #buildOKButton() {
        const {
            height,
            y,
            position: { centerX },
        } = this.#background;
        this.#okButton = makeSprite(getOKButtonImageConfig());
        this.#okButton.position.set(centerX, y + height / 2 + 10);
        this.#okButton.on("pointerdown", () => this.emit(OptionsEvent.OkButtonClick));
        this.addChild(this.#okButton);
        this.#hideOKButton();
    }

    #hideOKButton() {
        this.#okButton.interactive = false;
        this.#okButton.visible = false;
        this.#okButton.alpha = 0;
    }

    #showOKButton() {
        // GSAP
        this.#okButton.interactive = true;
        this.#okButton.visible = true;
        this.#okButton.alpha = 1;
    }
}

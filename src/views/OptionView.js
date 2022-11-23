import * as PIXI from "pixi.js";
import {
    getOptionDefaultBackgroundImageConfig,
    getOptionIconImageConfig,
    getOptionSelectedBackgroundImageConfig,
} from "../configs/SpriteConfigs";
import { makeSprite } from "../Utils";

export class OptionView extends PIXI.Container {
    #background; // Sprite
    #icon; // Sprite
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

    setSelected(value) {
        this.#selected = value;
        this.#updateBackground();
    }

    #build() {
        this.#buildDefaultBackground();
        this.#buildIcon();
    }

    #buildDefaultBackground() {
        this.#background = makeSprite(getOptionDefaultBackgroundImageConfig());
        this.#background.interactive = true;
        this.#background.on("pointerup", () => {
            this.emit("OptionClick", this.#type);
        });
        this.addChild(this.#background);
    }

    #updateBackground() {
        this.#background.texture = PIXI.Texture.from(
            this.#selected
                ? getOptionSelectedBackgroundImageConfig().texture
                : getOptionDefaultBackgroundImageConfig().texture,
        );
    }

    #buildIcon() {
        this.#icon = makeSprite(getOptionIconImageConfig(this.#type));
        this.addChild(this.#icon);
    }
}

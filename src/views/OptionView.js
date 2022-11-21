import * as PIXI from "pixi.js";
import {
    getOptionDefaultBackgroundImageConfig,
    getOptionIconImageConfig,
    getOptionSelectedBackgroundImageConfig,
} from "../configs/SpriteConfigs";
import { makeSprite } from "../Utils";

export class OptionView extends PIXI.Container {
    #backgroundDefault; // Sprite
    #backgroundSelected; // Sprite
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
        this.#buildSelectedBackground();
        this.#buildIcon();
    }

    #buildDefaultBackground() {
        this.#backgroundDefault = makeSprite(getOptionDefaultBackgroundImageConfig());
        this.#backgroundDefault.interactive = true;
        this.#backgroundDefault.on("pointerup", () => {
            this.emit("OptionClick", this.#type);
        });
        this.addChild(this.#backgroundDefault);
    }

    #buildSelectedBackground() {
        this.#backgroundSelected = makeSprite(getOptionSelectedBackgroundImageConfig());
        this.#backgroundSelected.visible = false;
        this.addChild(this.#backgroundSelected);
    }

    #updateBackground() {
        this.#backgroundDefault.visible = !this.#selected;
        this.#backgroundSelected.visible = this.#selected;
    }

    #buildIcon() {
        this.#icon = makeSprite(getOptionIconImageConfig(this.#type));
        this.addChild(this.#icon);
    }
}

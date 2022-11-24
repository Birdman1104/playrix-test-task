import * as PIXI from "pixi.js";
import { getDecorImageConfig, getRoomImageConfig } from "../configs/SpriteConfigs";
import { makeSprite } from "../Utils";

const decorsConfig = [
    { name: "plant_2", x: -190, y: -280, scale: 0.9 },
    { name: "book_stand", x: 170, y: -300 },
    { name: "globe", x: -545, y: -130, scale: 0.95 },
    { name: "couch", x: -390, y: 130, scale: 0.95 },
    { name: "austin", x: 30, y: -70 },
    { name: "plant_2", x: 490, y: -80, scale: 0.9 },
    { name: "table", x: -380, y: -40, scale: 0.95 },
];

export class BackgroundView extends PIXI.Container {
    #room;
    #decors = [];

    constructor() {
        super();
        this.#build();
    }

    getBounds() {
        const { width: w, height: h } = this.#room;
        //  getGameBounds();
        //this.#room;

        return new PIXI.Rectangle(-w / 2, -h / 2, w, h);
    }

    // getGridConfig() {
    //     return getBackgroundGridConfig();
    // }

    // rebuild() {
    //     super.rebuild(this.getGridConfig());
    // }

    #build() {
        this.#buildRoom();
        this.#buildDecors();
    }

    #buildRoom() {
        this.#room = makeSprite(getRoomImageConfig());
        this.addChild(this.#room);
    }

    #buildDecors() {
        decorsConfig
            .sort((a, b) => a.y - b.y)
            .forEach(({ name, x, y, scale = 1 }) => {
                const sprite = makeSprite(getDecorImageConfig(name));
                sprite.x = x;
                sprite.y = y;
                sprite.scale.set(scale);
                this.#decors.push(sprite);
                this.addChild(sprite);
            });
    }
}

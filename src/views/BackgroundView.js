import * as PIXI from "pixi.js";
import { getDecorImageConfig, getRoomImageConfig } from "../configs/SpriteConfigs";
import { lp, makeSprite } from "../Utils";

const decorsConfig = () => {
    return [
        { name: "plant_2", x: lp(-190, -130), y: lp(-280, -320), scale: 0.9 },
        { name: "book_stand", x: 170, y: -300 },
        { name: "globe", x: lp(-545, -160), y: lp(-130, -180), scale: lp(0.95, 0.7) },
        { name: "couch", x: lp(-390, -200), y: lp(130, 300), scale: 0.95 },
        { name: "austin", x: lp(30, 40), y: lp(-70, -150), scale: { x: lp(1, -1), y: 1 } },
        { name: "table", x: lp(-380, -170), y: lp(-40, 60), scale: 0.95 },
    ];
};

export class BackgroundView extends PIXI.Container {
    #room;
    #decors = [];

    constructor() {
        super();
        this.#build();
    }

    getBounds() {
        const { width: w, height: h } = this.#room;
        return new PIXI.Rectangle(-w / 2, -h / 2, w, h);
    }

    rebuild() {
        this.#decors.length === 0 ? this.#buildDecors() : this.#repositionDecors();
    }

    #build() {
        this.#buildRoom();
        this.#buildDecors();
    }

    #buildRoom() {
        this.#room = makeSprite(getRoomImageConfig());
        this.addChild(this.#room);
    }

    #buildDecors() {
        decorsConfig()
            .sort((a, b) => a.y - b.y)
            .forEach(({ name, x, y, scale = 1 }) => {
                const sprite = makeSprite(getDecorImageConfig(name));
                sprite.x = x;
                sprite.y = y;
                if (Number.isInteger(scale)) {
                    sprite.scale.set(scale);
                } else if (scale.x || scale.y) {
                    sprite.scale.set(scale.x, scale.y);
                }
                this.#decors.push(sprite);
                sprite.spriteName = name;
                this.addChild(sprite);
            });
    }

    #repositionDecors() {
        this.#decors.forEach((item) => {
            const { x, y } = decorsConfig().find((c) => c.name === item.spriteName);
            item.x = x;
            item.y = y;
        });
    }
}

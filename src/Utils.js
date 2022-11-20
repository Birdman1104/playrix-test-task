import * as PIXI from "pixi.js";

export const lp = (l, p) => {
    if (window.matchMedia("(orientation: portrait)").matches) {
        // PORTRAIT mode
        return p;
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
        // LANDSCAPE mode
        return l;
    }
};

export const getGameBounds = () => {
    const { clientWidth: width, clientHeight: height } = document.body;

    return new PIXI.Rectangle(0, 0, width, height);
};

export const fitDimension = (dim, minRatio, maxRatio) => {
    const ratioW = dim.width / dim.height;
    const ratioH = dim.height / dim.width;

    if (ratioW < ratioH) {
        if (ratioW > maxRatio) {
            dim.width = dim.width * (maxRatio / ratioW);
        } else if (ratioW < minRatio) {
            dim.height = dim.height * (ratioW / minRatio);
        }
    } else {
        if (ratioH > maxRatio) {
            dim.height = dim.height * (maxRatio / ratioH);
        } else if (ratioH < minRatio) {
            dim.width = dim.width * (ratioH / minRatio);
        }
    }

    return dim;
};

export function isSquareLikeScreen() {
    const { width, height } = getGameBounds();
    return Math.min(width, height) / Math.max(width, height) > 0.7;
}

export function isNarrowScreen() {
    const { width, height } = getGameBounds();
    return Math.min(width, height) / Math.max(width, height) < 0.5;
}

export const makeSprite = (config) => {
    const {
        texture,
        tint = 0,
        position = new PIXI.Point(0, 0),
        scale = new PIXI.Point(1, 1),
        anchor = new PIXI.Point(0.5, 0.5),
    } = config;

    const sprite = PIXI.Sprite.from(texture);

    sprite.scale.copyFrom(scale);
    sprite.anchor.copyFrom(anchor);
    sprite.position.copyFrom(position);

    if (tint) sprite.tint = tint;

    return sprite;
};

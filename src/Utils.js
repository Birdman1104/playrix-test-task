import * as PIXI from "pixi.js";
import pixiApp from "./PixiApp";

export const lp = (l, p) => {
    const { clientWidth: w, clientHeight: h } = document.body;
    return w > h ? l : p;
};

export const getGameBounds = () => {
    const { clientWidth: w, clientHeight: h } = document.body;
    return new PIXI.Rectangle(0, 0, w, h);
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

export const getDisplayObjectByProperty = (property, value, parent = null) => {
    const { children } = parent || pixiApp.pixiGame.stage;

    if (!children || children.length === 0) {
        return null;
    }

    for (let i = 0; i < children.length; i += 1) {
        const child = children[i];
        if (child[property] === value) {
            return child;
        }
        if (child instanceof PIXI.Container) {
            const displayObject = getDisplayObjectByProperty(property, value, child);
            if (displayObject) {
                return displayObject;
            }
        }
    }

    return null;
};

export const openPlayMarketPage = () => {
    window.open("https://play.google.com/store/apps/dev?id=6598096594674427568&hl=en&gl=US&pli=1", "_self");
};

export const delayRunnable = (delay, runnable, context, ...args) => {
    let delayMS = delay * 1000;
    const delayWrapper = () => {
        delayMS -= pixiApp.pixiGame.ticker.deltaMS;
        if (delayMS <= 0) {
            runnable.call(context, ...args);
            pixiApp.pixiGame.ticker.remove(delayWrapper);
        }
    };
    pixiApp.pixiGame.ticker.add(delayWrapper);
    return delayWrapper;
};

export const removeRunnable = (runnable) => {
    pixiApp.pixiGame.ticker.remove(runnable);
};

export const loopRunnable = (delay, runnable, context, ...args) => {
    let delayMS = delay * 1000;
    const delayWrapper = () => {
        delayMS -= pixiApp.pixiGame.ticker.deltaMS;
        if (delayMS <= 0) {
            runnable.call(context, ...args);
            delayMS = delay * 1000;
        }
    };
    pixiApp.pixiGame.ticker.add(delayWrapper);
    return delayWrapper;
};

export const postRunnable = (runnable, context = null, ...args) => {
    return delayRunnable(pixiApp.pixiGame.ticker.deltaMS / 1000, runnable, context, ...args);
};

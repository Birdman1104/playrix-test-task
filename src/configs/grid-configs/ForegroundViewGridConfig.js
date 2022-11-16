import { lp } from "../../Utils";

export const getForegroundViewGridConfig = () => {
    return lp(getForegroundViewGridLandscapeConfig, getForegroundViewGridPortraitConfig).call(null);
};

const getForegroundViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "foreground",
        // debug: { color: 0x?a0a0ef },
        bounds,
        cells: [
            {
                name: "tutorial",
                bounds: { x: 0, y: 0, width: 0.5, height: 0.5 },
            },
        ],
    };
};

const getForegroundViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "foreground",
        debug: { color: 0xa0a0ef },
        bounds,
        cells: [
            {
                name: "tutorial",
                bounds: { x: 0, y: 0, width: 0.5, height: 0.5 },
            },
        ],
    };
};

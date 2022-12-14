import { lp } from "../../Utils";

export const getForegroundViewGridConfig = () => {
    return lp(getForegroundViewGridLandscapeConfig, getForegroundViewGridPortraitConfig).call(null);
};

const getForegroundViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "foreground",
        // debug: { color: 0xa0a0ef },
        bounds,
        cells: [
            {
                name: "logo",
                bounds: { x: 0, y: 0, width: 0.225, height: 0.18 },
                offset: { x: 20, y: 10 },
            },
            {
                name: "logo_cta",
                bounds: { x: 0, y: 0, width: 0.25, height: 0.2 },
                offset: { x: 20, y: 10 },
            },
            {
                name: "p_cta",
                bounds: { x: 0.25, y: 0.77, width: 0.5, height: 0.2 },
            },
        ],
    };
};

const getForegroundViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "foreground",
        // debug: { color: 0xa0a0ef },
        bounds,
        cells: [
            {
                name: "logo",
                bounds: { x: 0, y: 0, width: 1, height: 0.1 },
                offset: { y: 10 },
            },
            {
                name: "logo_cta",
                bounds: { x: 0, y: 0.05, width: 1, height: 0.1 },
                offset: { y: 10 },
            },
            {
                name: "p_cta",
                bounds: { x: 0, y: 0.89, width: 1, height: 0.105 },
                offset: { y: -10 },
            },
        ],
    };
};

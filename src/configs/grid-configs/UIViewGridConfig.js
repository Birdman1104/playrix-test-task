import { lp } from "../../Utils";

export const getUIViewGridConfig = () => {
    return lp(getUIViewGridLandscapeConfig, getUIViewGridPortraitConfig).call(null);
};

const getUIViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "ui",
        debug: { color: 0x00f0ff },
        bounds,
        cells: [
            {
                name: "plant",
                bounds: { x: 0.9, y: 0.8, width: 0.1, height: 0.2 },
            },
        ],
    };
};

const getUIViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };

    return {
        name: "ui",
        debug: { color: 0x00f0ff },
        bounds,
        cells: [
            {
                name: "plant",
                bounds: { x: 0.8, y: 0.6, width: 0.2, height: 0.2 },
            },
        ],
    };
};

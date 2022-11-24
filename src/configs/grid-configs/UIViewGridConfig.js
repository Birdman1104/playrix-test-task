import { isNarrowScreen, lp } from "../../Utils";

export const getUIViewGridConfig = () => {
    return lp(getUIViewGridLandscapeConfig, getUIViewGridPortraitConfig).call(null);
};

const getUIViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "ui",
        // debug: { color: 0x00f0ff },
        bounds,
        cells: [],
    };
};

const getUIViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    const height = isNarrowScreen() ? 0.065 : 0.1;

    return {
        name: "ui",
        debug: { color: 0x00f0ff },
        bounds,
        cells: [],
    };
};

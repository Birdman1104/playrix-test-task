import { CellScale } from "@armathai/pixi-grid";
import { isNarrowScreen, lp } from "../../Utils";

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
                name: "p_cta",
                scale: CellScale.fill,
                bounds: { x: 0.7, y: 0.125, width: 0.2, height: 0.15 },
            },
        ],
    };
};

const getUIViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    const height = isNarrowScreen() ? 0.065 : 0.1;

    return {
        name: "ui",
        debug: { color: 0x00f0ff },
        bounds,
        cells: [
            {
                name: "p_cta",
                // debug: { color: 0x00f0ff },
                scale: CellScale.fill,
                bounds: { x: 0.2, y: 0.05, width: 0.6, height },
            },
        ],
    };
};

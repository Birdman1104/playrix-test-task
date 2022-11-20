import { CellScale } from "@armathai/pixi-grid";
import { lp } from "../../Utils";

export const getBackgroundGridConfig = () => {
    return lp(getBackgroundViewGridLandscapeConfig, getBackgroundViewGridPortraitConfig).call(null);
};

const getBackgroundViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "background",
        // debug: { color: 0x00ff00 },
        bounds,
        cells: [
            {
                name: "bg",
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.envelop,
            },
        ],
    };
};

const getBackgroundViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "background",
        // debug: { color: 0x00ff00 },
        bounds,
        cells: [
            {
                name: "bg",
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.envelop,
            },
        ],
    };
};

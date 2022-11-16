import { CellScale } from "@armathai/pixi-grid";
import { lp } from "../../Utils";

export const getCTAViewGridConfig = () => {
    return lp(getCTAViewGridLandscapeConfig, getCTAViewGridPortraitConfig).call(null);
};

const getCTAViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "cta_view",
        debug: { color: 0x000fff },
        bounds,
        cells: [
            {
                name: "popup",
                bounds: { x: 0.25, y: 0.25, width: 0.5, height: 0.5 },
            },
            {
                name: "blocker",
                scale: CellScale.fill,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

const getCTAViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "cta_view",
        debug: { color: 0x000fff },
        bounds,
        cells: [
            {
                name: "popup",
                bounds: { x: 0.25, y: 0.25, width: 0.5, height: 0.5 },
            },
            {
                name: "blocker",
                scale: CellScale.fill,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

import { CellAlign, CellScale } from "@armathai/pixi-grid";
import { lp } from "../../Utils";

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "game",
        bounds,
        debug: { color: 0x0000ff },
        cells: [
            {
                name: "stair",
                scale: CellScale.envelop,
                align: CellAlign.leftCenter,
                bounds: { x: 0.6, y: 0.2, width: 0.5, height: 0.6 },
            },
            {
                name: "option_1",
                bounds: { x: 0.1, y: 0.5, width: 0.1, height: 0.1 },
            },
            {
                name: "option_2",
                bounds: { x: 0.3, y: 0.5, width: 0.1, height: 0.1 },
            },
            {
                name: "option_3",
                bounds: { x: 0.5, y: 0.5, width: 0.1, height: 0.1 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "game",
        debug: { color: 0x0000ff },
        bounds,
        cells: [
            {
                name: "stair",
                scale: CellScale.envelop,
                align: CellAlign.leftCenter,
                bounds: { x: 0.475, y: 0.35, width: 0.55, height: 0.55 },
            },
            {
                name: "option_1",
                bounds: { x: 0.1, y: 0.5, width: 0.1, height: 0.1 },
            },
            {
                name: "option_2",
                bounds: { x: 0.3, y: 0.5, width: 0.1, height: 0.1 },
            },
            {
                name: "option_3",
                bounds: { x: 0.5, y: 0.5, width: 0.1, height: 0.1 },
            },
        ],
    };
};

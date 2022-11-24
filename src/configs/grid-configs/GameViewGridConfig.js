import { CellAlign, CellScale } from "@armathai/pixi-grid";
import { isNarrowScreen, isSquareLikeScreen, lp } from "../../Utils";

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    let stairCellBounds = { x: 0.71, y: 0.1, width: 0.38, height: 0.8 };
    let stairCellScale = CellScale.showAll;
    if (isSquareLikeScreen()) {
        stairCellScale = CellScale.envelop;
        stairCellBounds = { x: 0.71, y: 0.25, width: 0.38, height: 0.55 };
    }
    return {
        name: "game",
        bounds,
        // debug: { color: 0x0000ff },
        cells: [
            {
                name: "stair",
                align: CellAlign.rightBottom,
                scale: stairCellScale,
                bounds: stairCellBounds,
            },
            {
                name: "option_1",
                bounds: { x: 0.58, y: 0, width: 0.1, height: 0.2 },
                offset: { x: 0, y: 15 },
            },
            {
                name: "option_2",
                bounds: { x: 0.71, y: 0, width: 0.1, height: 0.2 },
                offset: { x: 0, y: 15 },
            },
            {
                name: "option_3",
                bounds: { x: 0.84, y: 0, width: 0.1, height: 0.2 },
                offset: { x: 0, y: 15 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    const optionY = isNarrowScreen() ? 0.7 : 0.68;
    const option1x = isSquareLikeScreen() ? 0.29 : 0.15;
    const option2x = isSquareLikeScreen() ? 0.51 : 0.43;
    return {
        name: "game",
        // debug: { color: 0x0000ff },
        bounds,
        cells: [
            {
                name: "stair",
                align: CellAlign.rightBottom,
                scale: CellScale.envelop,
                bounds: { x: 0.55, y: 0.37, width: 0.7, height: 0.41 },
            },
            {
                name: "option_1",
                bounds: { x: option1x, y: optionY - 0.085, width: 0.2, height: 0.125 },
            },
            {
                name: "option_2",
                bounds: { x: option2x, y: optionY, width: 0.2, height: 0.125 },
            },
            {
                name: "option_3",
                bounds: { x: 0.76, y: optionY - 0.02, width: 0.2, height: 0.125 },
            },
        ],
    };
};

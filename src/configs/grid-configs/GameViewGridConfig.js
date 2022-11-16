import { lp } from "../../Utils";

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "game",
        bounds,
        // debug: { color: 0x0000ff },
        cells: [
            {
                name: "board",
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: "game",
        // debug: { color: 0x0000ff },
        bounds,
        cells: [
            {
                name: "board",
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

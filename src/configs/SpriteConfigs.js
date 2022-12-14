import * as PIXI from "pixi.js";

export const getRoomImageConfig = () => ({
    texture: "room_clean.jpg",
});

export const getStairImageConfig = (type) => ({
    texture: `stairs/${type}.png`,
});

export const getOptionDefaultBackgroundImageConfig = (type) => ({
    texture: "stairs-icons/choice_default.png",
});

export const getOptionSelectedBackgroundImageConfig = (type) => ({
    texture: "stairs-icons/choice_selected.png",
});

export const getHammerIconImageConfig = () => ({
    texture: "stairs-icons/icon_hammer.png",
    anchor: new PIXI.Point(0.5, 1),
});

export const getOKButtonImageConfig = () => ({
    texture: "stairs-icons/ok_btn.png",
    anchor: new PIXI.Point(0.5, 0),
});

export const getOptionIconImageConfig = (type) => ({
    texture: `stairs-icons/${type}_icon.png`,
});

export const getLogoImageConfig = () => ({
    texture: `ui/logo.png`,
});

export const getPCTAImageConfig = () => ({
    texture: `cta/cta_btn.png`,
});

export const getWellDoneImageConfig = () => ({
    texture: `cta/well_done.png`,
    anchor: new PIXI.Point(0.5, 1),
});

export const getCTAPopupImageConfig = () => ({
    texture: `cta/cta_popup.png`,
});

export const getHandImageConfig = () => ({
    texture: `ui/hand.png`,
    anchor: new PIXI.Point(0.69, 0.07),
});

export const getDecorImageConfig = (key) => ({
    texture: `decors/${key}.png`,
});

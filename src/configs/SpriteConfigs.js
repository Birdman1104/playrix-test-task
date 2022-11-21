export const getRoomImageConfig = () => ({
    texture: "room.png",
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

export const getOptionIconImageConfig = (type) => ({
    texture: `stairs-icons/${type}_icon.png`,
});

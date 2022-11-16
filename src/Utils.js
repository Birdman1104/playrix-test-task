export const lp = (l, p) => {
    if (window.matchMedia("(orientation: portrait)").matches) {
        // you're in PORTRAIT mode
        return p;
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
        // you're in LANDSCAPE mode
        return l;
    }
};

export const fitDimension = (dim, minRatio, maxRatio) => {
    const ratioW = dim.width / dim.height;
    const ratioH = dim.height / dim.width;

    if (ratioW < ratioH) {
        if (ratioW > maxRatio) {
            dim.width = dim.width * (maxRatio / ratioW);
        } else if (ratioW < minRatio) {
            dim.height = dim.height * (ratioW / minRatio);
        }
    } else {
        if (ratioH > maxRatio) {
            dim.height = dim.height * (maxRatio / ratioH);
        } else if (ratioH < minRatio) {
            dim.width = dim.width * (ratioH / minRatio);
        }
    }

    return dim;
};

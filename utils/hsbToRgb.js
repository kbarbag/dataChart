const hsbToRgb = function hsbToRgb(hue) {
    const V = 1;
    const S = 1;
    hue += 30;
    if (hue === 360) hue = 0;

    let c = V * S;
    let x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    let m = V - c;
    let pR, pG, pB;
    if (hue >= 0 && hue < 60) {
        pR = c;
        pG = x;
        pB = 0;
    } else if (hue < 120) {
        pR = x;
        pG = c;
        pB = 0;
    } else if (hue < 180) {
        pR = 0;
        pG = c;
        pB = x;
    } else if (hue < 240) {
        pR = 0;
        pG = x;
        pB = c;
    } else if (hue < 300) {
        pR = x;
        pG = 0;
        pB = c;
    } else {
        pR = c;
        pG = 0;
        pB = x;
    }
    let r = (pR + m) * 255;
    let g = (pG + m) * 255;
    let b = (pB + m) * 255;
    let rH = (parseInt(Math.round(r).toString(16), 16) | 88).toString(16);
    let gH = (parseInt(Math.round(g).toString(16), 16) | 88).toString(16);
    let bH = (parseInt(Math.round(b).toString(16), 16) | 88).toString(16);
    // r = parseInt(Math.round(r).toString(16), 16).toString(16);
    // g = parseInt(Math.round(g).toString(16), 16).toString(16);
    // b = parseInt(Math.round(b).toString(16), 16).toString(16);
    // r = '00'.substring(r.length) + r;
    // g = '00'.substring(g.length) + g;
    // b = '00'.substring(b.length) + b;
    let hex = '#';
    hex += r;
    hex += g;
    hex += b;
    let hover = '#';
    // rH = '00'.substring(rH.length) + rH;
    // gH = '00'.substring(gH.length) + gH;
    // bH = '00'.substring(bH.length) + bH;
    hover += rH + gH + bH;
    return { hex, hover, decimal: hue, r, g, b };
}

export default hsbToRgb;
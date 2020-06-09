const hsbToRgb = function hsbToRgb(hue) {
    const V = 1;
    const V2 = 0.5;
    const S = 1;
    hue += 30;
    if (hue === 360) hue = 0;

    let c = V * S;
    let c2 = V2 * S;
    let x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    let x2 = c2 * (1 - Math.abs(((hue / 60) % 2) - 1));
    let m = V - c;
    let m2 = V2 - c2;
    let pR, pG, pB, pRH, pGH, pBH;
    if (hue >= 0 && hue < 60) {
        pR = c;
        pG = x;
        pB = 0;
        pRH = c2;
        pGH = x2;
        pBH = 0;
    } else if (hue < 120) {
        pR = x;
        pG = c;
        pB = 0;
        pRH = x2;
        pGH = c2;
        pBH = 0;
    } else if (hue < 180) {
        pR = 0;
        pG = c;
        pB = x;
        pRH = 0;
        pGH = c2;
        pBH = x2;
    } else if (hue < 240) {
        pR = 0;
        pG = x;
        pB = c;
        pRH = 0;
        pGH = x2;
        pBH = c2;
    } else if (hue < 300) {
        pR = x;
        pG = 0;
        pB = c;
        pRH = x2;
        pGH = 0;
        pBH = c2;
    } else {
        pR = c;
        pG = 0;
        pB = x;
        pRH = c2;
        pGH = 0;
        pBH = x2;
    }
    let r = (pR + m) * 255;
    let g = (pG + m) * 255;
    let b = (pB + m) * 255;
    r = parseInt(Math.round(r).toString(16), 16).toString(16);
    g = parseInt(Math.round(g).toString(16), 16).toString(16);
    b = parseInt(Math.round(b).toString(16), 16).toString(16);
    r = '00'.substring(r.length) + r;
    g = '00'.substring(g.length) + g;
    b = '00'.substring(b.length) + b;
    let hex = '#';
    hex += r;
    hex += g;
    hex += b;
    let hover = '#';
    let rH = (pRH + m2) * 255;
    let gH = (pGH + m2) * 255;
    let bH = (pBH + m2) * 255;
    rH = (parseInt(Math.round(rH).toString(16), 16)).toString(16);
    gH = (parseInt(Math.round(gH).toString(16), 16)).toString(16);
    bH = (parseInt(Math.round(bH).toString(16), 16)).toString(16);
    rH = '00'.substring(rH.length) + rH;
    gH = '00'.substring(gH.length) + gH;
    bH = '00'.substring(bH.length) + bH;
    hover += rH + gH + bH;
    return { hex, hover, decimal: hue, r, g, b };
}

export default hsbToRgb;
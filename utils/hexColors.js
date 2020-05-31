const getNextHexColor = function (input) {
    if (input < 0) input = 0;
    input += 1;
    if (input === 7) input = 0;
    let bin = input.toString(2);
    bin = '000'.substring(bin.length) + bin;
    let returnHexColor = '#';
    for (let i = 0; i < bin.length; i++) {
        if (bin.charAt(i) === '1') returnHexColor += 'F';
        else returnHexColor += '0';
    }
    return { hex: returnHexColor, decimal: input };
}

export default getNextHexColor;
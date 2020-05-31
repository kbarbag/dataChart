import getNextHexColor from '../utils/hexColors.js';

test(`getNextHexColor(0) => #00F:`, () => {
    let colors = getNextHexColor(0);
    expect(colors).toEqual({ hex: '#00F', decimal: 1 });
});

test(`getNextHexColor(1) => #0F0:`, () => {
    let colors = getNextHexColor(1);
    expect(colors).toEqual({ hex: '#0F0', decimal: 2 });
});
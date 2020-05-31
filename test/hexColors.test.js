import getNextHexColor from '../utils/hexColors.js';

describe('Static tests:', () => {
    test(`getNextHexColor(0) => #00F:`, () => {
        let colors = getNextHexColor(0);
        expect(colors).toEqual({ hex: '#00F', decimal: 1 });
    });

    test(`getNextHexColor(1) => #0F0:`, () => {
        let colors = getNextHexColor(1);
        expect(colors).toEqual({ hex: '#0F0', decimal: 2 });
    });
});

describe('Circular Rotation of Colors 0-7', () => {
    describe('When: initial color is less than 0', () => {
        let colors;
        let expectedValue = { hex: '#00F', decimal: 1 };
        test('Then: return value is {hex: "#00F", decimal: 1}', () => {
            colors = getNextHexColor(-5);
            expect(colors).toEqual(expectedValue);
        });

        let currentDecimal = 0;
        for (let i = 0; i < 20; i++) {
            test(`Rotate Hex Color ${i + 1} time(s):`, () => {
                colors = getNextHexColor(currentDecimal);
                switch (currentDecimal) {
                    case 0:
                        expectedValue.hex = '#00F';
                        break;
                    case 1:
                        expectedValue.hex = '#0F0';
                        break;
                    case 2:
                        expectedValue.hex = '#0FF';
                        break;
                    case 3:
                        expectedValue.hex = '#F00';
                        break;
                    case 4:
                        expectedValue.hex = '#F0F';
                        break;
                    case 5:
                        expectedValue.hex = '#FF0';
                        break;
                    case 6:
                        expectedValue.hex = '#000';
                        break;
                    default:
                        expectedValue.hex = '#8Fa';
                        break;
                }
                expectedValue.decimal = currentDecimal !== 6 ? currentDecimal + 1 : 0;
                expect(colors).toEqual(expectedValue);
                currentDecimal = colors.decimal;
            });
        }
    });


});
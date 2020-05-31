import flatObject from '../utils/flatObject.js';

test(`Flatten Object:`, () => {
    let tempObj = { foo: 'bar', multi: { dimensional: ['array', 'values'] } };
    let flattened = flatObject(tempObj);
    expect(flattened).toEqual({ foo: 'bar', 'multi.dimensional.0': 'array', 'multi.dimensional.1': 'values' })
});
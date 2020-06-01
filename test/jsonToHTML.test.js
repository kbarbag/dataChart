import jsonToHTML from '../utils/jsonToHTML.js';

describe('Static tests:', () => {
    let data = { id: 1, name: 'Nim', genres: ['pop', 'rock', 'r&b', '70s'], followers_count: { $number: 200 } };
    test(`jsonToHTML() prints html string:`, () => {
        let result = jsonToHTML(data);
        let expectedValue = 'id: 1<br />name: Nim<br />genres: pop,rock,r&b,70s<br />followers_count: [object Object]<br />';
        expect(result).toEqual(expectedValue);
    });
});
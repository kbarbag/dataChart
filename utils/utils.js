import flatObject from './flatObject.js';
import getNextHexColor from './hexColors.js';
import hsbToRgb from './hsbToRgb.js';
import HTMLBuilder from './htmlBuilder.js';
import jsonToHTML from './jsonToHTML.js';

function Utilities() { }

Utilities.prototype.hsbToRgb = hsbToRgb;

Utilities.prototype.jsonToHTML = jsonToHTML;

Utilities.prototype.getNextHexColor = getNextHexColor;

Utilities.prototype.flatObject = flatObject;

Utilities.prototype.flatObjectNumbers = function (obj, stack = '') {
    let returnObj = this.flatObject(obj, stack);

    for (let [key, value] of Object.entries(returnObj)) {
        if (!(typeof value === 'number' || (typeof value === 'string' && !(isNaN(value))))) {
            delete returnObj[key];
        }
    }

    return returnObj;
};

export { Utilities, HTMLBuilder }
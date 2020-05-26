const flatObject = function (obj, stack = '') {
    let returnObj = {};

    function recursiveFlattenHelper(obj, stack) {
        let helperReturn = {};
        let newStack;
        for (let [key, value] of Object.entries(obj)) {
            newStack = key;
            if (stack !== '') newStack = stack + '.' + newStack;

            if (value === null || value === undefined) helperReturn[newStack] = value;
            else if (typeof value === 'object') {
                let flattenedObject = recursiveFlattenHelper(value, newStack);
                if (!flattenedObject) continue;
                for (let [k, v] of Object.entries(flattenedObject)) {
                    helperReturn[k] = v;
                }
            }
            else helperReturn[newStack] = value;
        }

        return helperReturn;
    }

    returnObj = recursiveFlattenHelper(obj, stack);

    return returnObj;
}

export default flatObject;
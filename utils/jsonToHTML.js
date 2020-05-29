const jsonToHTML = function (input) {
    let outputHTML = '';
    for (let [key, value] of Object.entries(input)) {
        outputHTML += `${key}: ${value}<br />`;
    }
    return outputHTML;
}

export default jsonToHTML;
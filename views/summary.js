const { Elements } = require('../enums/enums.js');

const Summary = function ({ graphWrapperId }) {
    this.graphWrapperId = graphWrapperId;
    this.graphWrapper = document.getElementById(this.graphWrapperId);

    //create parent row
    let insertElement = this.graphWrapper;
    let element = document.createElement('div');
    element.classList = 'row';
    insertElement.appendChild(element);
    insertElement = element;

    //create summary html
    element = document.createElement('div');
    element.id = `${this.graphWrapperId}${Elements.summary}`;
    element.classList = 'col-sm-12';
    element.style = 'opactiy: 0;';
    element.innerHTML = '<h1>Summary:</h1>category:<br />group:<br />percent:<br />count:<br />total:<br />';
    insertElement.appendChild(element);
    return;
}

export default Summary;
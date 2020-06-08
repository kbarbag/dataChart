import HTMLBuilder from './htmlBuilder.js';

const { Elements } = require('../enums/enums.js');

const Summary = function ({ graphWrapperId }) {
    new HTMLBuilder({ id: graphWrapperId })
        .createDivChild({ classes: 'row' })
        .createDiv({ id: `${graphWrapperId}${Elements.summary}`, classes: 'col-sm-12', html: '<h1>Summary:</h1>category:<br />group:<br />percent:<br />count:<br />total:<br />', style: 'opacity:0;' });
    return;
}

export default Summary;
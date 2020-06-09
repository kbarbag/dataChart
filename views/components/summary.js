const { Elements } = require('../../enums/enums.js');
const { HTMLBuilder } = require('../../utils/utils.js');

const Summary = function () {
    new HTMLBuilder({ id: window.dataChartGraphWrapperId })
        .createDivChild({ classes: 'row' })
        .createDiv({ id: `${window.dataChartGraphWrapperId}${Elements.summary}`, classes: 'col-sm-12', html: '<h1>Summary:</h1>category:<br />group:<br />percent:<br />count:<br />total:<br />', style: 'opacity:0;' });
    return;
}

export default Summary;
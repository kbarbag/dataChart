import Header from './components/header.js';
import Summary from './components/summary.js';

const { Elements } = require('../enums/enums.js');
const { HTMLBuilder } = require('../utils/utils.js');

/*
<div id="graph_wrapper">
    <div class="row">
        <div id="graph" class="col-sm-10 col-sm-offset-2">
            <canvas id="canvas"></canvas>
        </div>
    </div>
    <div class="row">
        <div id="detailed_data" class="col-sm-12">
            <textarea id="hover_data_text"></textarea>
        </div>
    </div>
</div>
*/

const StandardView = function ({ categories }) {
    this.graphWrapper = document.getElementById(window.dataChartGraphWrapperId);
    this.categories = categories;
    return this;
}

StandardView.prototype.create = function () {
    new Header({ categories: this.categories });

    new Summary();

    new HTMLBuilder({ id: window.dataChartGraphWrapperId })
        .createDivChild({ classes: 'row' })
        .createDivChild({ id: `${window.dataChartGraphWrapperId}${Elements.graph}`, classes: 'col-sm-10 col-sm-offset-2' })
        .createElement({ id: `${window.dataChartGraphWrapperId}${Elements.canvas}`, elementName: 'canvas' })
        .createDivChild({ insertId: window.dataChartGraphWrapperId, classes: 'row' })
        .createDivChild({ id: `${window.dataChartGraphWrapperId}${Elements.detailedData}`, classes: 'col-sm-12' })
        .createElement({ id: `${window.dataChartGraphWrapperId}${Elements.hover_data_text}`, classes: 'form-control', elementName: 'textarea', attrs: { 'readonly': '' }, style: 'height: 100vh;' });
    return;
}

export default StandardView;
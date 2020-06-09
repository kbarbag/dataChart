import Header from './components/header.js';
import Summary from './components/summary.js';

const { Elements } = require('../enums/enums.js');
const { HTMLBuilder } = require('../utils/utils.js');

/*
 <div id="graph_wrapper">
    <div id="side_by_side" class="row">
        <div id="graph" class="col-sm-6">
            <canvas id="canvas"></canvas>
        </div>
        <div id="detailed_data" class="col-sm-6">
            <textarea id="hover_data_text"></textarea>
        </div>
    </div>
 </div> 
 */

const SideBySide = function ({ categories }) {
    this.graphWrapper = document.getElementById(window.dataChartGraphWrapperId);
    this.categories = categories;
    return this;
}

SideBySide.prototype.create = function () {
    new Header({ categories: this.categories });

    new Summary();

    new HTMLBuilder({ id: window.dataChartGraphWrapperId })
        .createDivChild({ id: `${window.dataChartGraphWrapperId}${Elements.sideBySide}`, classes: 'row' })
        .createDivChild({ id: `${window.dataChartGraphWrapperId}${Elements.graph}`, classes: 'col-sm-6' })
        .createElement({ id: `${window.dataChartGraphWrapperId}${Elements.canvas}`, elementName: 'canvas' })
        .createDivChild({ id: `${window.dataChartGraphWrapperId}${Elements.detailedData}`, insertId: `${window.dataChartGraphWrapperId}${Elements.sideBySide}`, classes: 'col-sm-6' })
        .createElement({ id: `${window.dataChartGraphWrapperId}${Elements.hover_data_text}`, elementName: 'textarea', classes: 'form-control', attrs: { 'readonly': '' }, style: 'height:100vh;' });

    return;
}

export default SideBySide;
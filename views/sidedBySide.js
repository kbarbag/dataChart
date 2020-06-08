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

const SideBySide = function ({ graphWrapperId, categories, selectedCategory }) {
    this.graphWrapperId = graphWrapperId;
    this.graphWrapper = document.getElementById(this.graphWrapperId);
    this.categories = categories;
    this.selectedCategory = selectedCategory;
    return this;
}

SideBySide.prototype.create = function () {
    new Header({ graphWrapperId: this.graphWrapperId, categories: this.categories, selectedCategory: this.selectedCategory });

    new Summary({ graphWrapperId: this.graphWrapperId });

    new HTMLBuilder({ id: this.graphWrapperId })
        .createDivChild({ id: `${this.graphWrapperId}${Elements.sideBySide}`, classes: 'row' })
        .createDivChild({ id: `${this.graphWrapperId}${Elements.graph}`, classes: 'col-sm-6' })
        .createElement({ id: `${this.graphWrapperId}${Elements.canvas}`, elementName: 'canvas' })
        .createDivChild({ id: `${this.graphWrapperId}${Elements.detailedData}`, insertId: `${this.graphWrapperId}${Elements.sideBySide}`, classes: 'col-sm-6' })
        .createElement({ id: `${this.graphWrapperId}${Elements.hover_data_text}`, elementName: 'textarea', classes: 'form-control', attrs: { 'readonly': '' }, style: 'height:100vh;' });

    return;
}

export default SideBySide;
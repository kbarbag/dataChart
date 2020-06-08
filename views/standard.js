import Header from './header.js';
import Summary from './summary.js';
import HTMLBuilder from './htmlBuilder.js';

const { Elements } = require('../enums/enums.js');

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

const StandardView = function ({ graphWrapperId, categories, selectedCategory }) {
    this.graphWrapperId = graphWrapperId;
    this.graphWrapper = document.getElementById(this.graphWrapperId);
    this.categories = categories;
    this.selectedCategory = selectedCategory;
    return this;
}

StandardView.prototype.create = function () {
    new Header({ graphWrapperId: this.graphWrapperId, categories: this.categories, selectedCategory: this.selectedCategory });

    new Summary({ graphWrapperId: this.graphWrapperId });

    new HTMLBuilder({ id: this.graphWrapperId })
        .createDivChild({ classes: 'row' })
        .createDivChild({ id: `${this.graphWrapperId}${Elements.graph}`, classes: 'col-sm-10 col-sm-offset-2' })
        .createElement({ id: `${this.graphWrapperId}${Elements.canvas}`, elementName: 'canvas' })
        .createDivChild({ insertId: this.graphWrapperId, classes: 'row' })
        .createDivChild({ id: `${this.graphWrapperId}${Elements.detailedData}`, classes: 'col-sm-12' })
        .createElement({ id: `${this.graphWrapperId}${Elements.hover_data_text}`, classes: 'form-control', elementName: 'textarea', attrs: { 'readonly': '' }, style: 'height: 100vh;' });
    return;
}

export default StandardView;
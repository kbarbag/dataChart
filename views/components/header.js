const { Elements } = require('../../enums/enums.js');
const { HTMLBuilder } = require('../../utils/utils.js');

/*
<div id="graph_wrapper_id">
    <div id="header" class="row">
        <div class="col-sm-1">Category Group:</div>
        <div id="category_wrapper" class="col-sm-3">
            <select id="category_select" class="form-control"></select>
        </div>
        <div class="col-sm-1">Graph Type:</div>
        <div id="graph_type_wrapper" class="col-sm-2">
            <select id="graph_type" class="form-control"></select>
        </div>
        <div id="increments_label" class="col-sm-1">Increments:</div>
        <div id="increments_wrapper" class="col-sm-1">
            <input id="increments" type="number" min=1 value=1 />
        </div>
    </div>
</div>
*/

const Header = function ({ categories }) {
    let categoriesSelect = {};
    categories.forEach(category => {
        categoriesSelect[category] = category;
    });
    new HTMLBuilder({ id: window.dataChartGraphWrapperId })
        .createDivChild({ id: `${window.dataChartGraphWrapperId}${Elements.header}`, classes: 'row' })
        .createDiv({ classes: 'col-sm-1', html: 'Category Group:' })
        .createDivChild({ id: `${window.dataChartGraphWrapperId}${Elements.categoryWrapper}`, classes: 'col-sm-3' })
        .createSelect({ id: `${window.dataChartGraphWrapperId}${Elements.categorySelect}`, classes: 'form-control', options: categoriesSelect, selected: window.dataChartSelectedCategory })
        .createDiv({ insertId: `${window.dataChartGraphWrapperId}${Elements.header}`, classes: 'col-sm-1', html: 'Graph Type:' })
        .createDivChild({ id: `${window.dataChartGraphWrapperId}${Elements.graphTypeWrapper}`, classes: 'col-sm-2' })
        .createSelect({ id: `${window.dataChartGraphWrapperId}${Elements.graphType}`, classes: 'form-control', options: { 'Pie Chart': '0', 'Bar Graph': '1' }, selected: window.dataChartGraphType })
        .createDiv({ id: `${window.dataChartGraphWrapperId}${Elements.incrementsLbl}`, insertId: `${window.dataChartGraphWrapperId}${Elements.header}`, classes: 'col-sm-1', html: 'Increments:' })
        .createDivChild({ id: `${window.dataChartGraphWrapperId}${Elements.incrementsWrpr}`, classes: 'col-sm-1' })
        .createElement({ id: `${window.dataChartGraphWrapperId}${Elements.increments}`, classes: 'form-control', elementName: 'input', attrs: { type: 'number', min: 1, value: window.dataChartPieGraphIncrements } })
        .createDivChild({ insertId: `${window.dataChartGraphWrapperId}${Elements.header}`, classes: 'col-sm-2 col-sm-offset-1' })
        .createSelect({ id: `${window.dataChartGraphWrapperId}${Elements.viewType}`, classes: 'form-control', options: { 'Side By Side': 0, 'Top Over Bottom': 1 }, selected: window.dataChartViewType.val });
    return;
}

export default Header;
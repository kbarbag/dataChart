import HTMLBuilder from './htmlBuilder.js';

const { Elements } = require('../enums/enums.js');

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

const Header = function ({ graphWrapperId, categories, selectedCategory }) {
    let categoriesSelect = {};
    categories.forEach(category => {
        categoriesSelect[category] = category;
    });
    new HTMLBuilder({ id: graphWrapperId })
        .createDivChild({ id: `${graphWrapperId}${Elements.header}`, classes: 'row' })
        .createDiv({ classes: 'col-sm-1', html: 'Category Group:' })
        .createDivChild({ id: `${graphWrapperId}${Elements.categoryWrapper}`, classes: 'col-sm-3' })
        .createSelect({ id: `${graphWrapperId}${Elements.categorySelect}`, classes: 'form-control', options: categoriesSelect, selected: selectedCategory.val })
        .createDiv({ insertId: `${graphWrapperId}${Elements.header}`, classes: 'col-sm-1', html: 'Graph Type:' })
        .createDivChild({ id: `${graphWrapperId}${Elements.graphTypeWrapper}`, classes: 'col-sm-2' })
        .createSelect({ id: `${graphWrapperId}${Elements.graphType}`, classes: 'form-control', options: { 'Pie Chart': '0', 'Bar Graph': '1' } })
        .createDiv({ id: `${graphWrapperId}${Elements.incrementsLbl}`, insertId: `${graphWrapperId}${Elements.header}`, classes: 'col-sm-1', html: 'Increments:' })
        .createDivChild({ id: `${graphWrapperId}${Elements.incrementsWrpr}`, classes: 'col-sm-1' })
        .createElement({ id: `${graphWrapperId}${Elements.increments}`, classes: 'form-control', elementName: 'input', attrs: { type: 'number', min: 1, value: 1 } });
    return;
}

export default Header;
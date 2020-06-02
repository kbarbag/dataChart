const { Elements } = require('../enums/enums.js');

const SideBySide = function ({ graphWrapperId, categories, selectedCategory }) {
    this.graphWrapperId = graphWrapperId;
    this.graphWrapper = document.getElementById(this.graphWrapperId);
    this.categories = categories;
    this.selectedCategory = selectedCategory;
    return this;
}

SideBySide.prototype.create = function () {
    //create first row (header)
    let insertElement = this.graphWrapper;
    let element = document.createElement('div');
    element.classList = 'row'
    element.id = `${this.graphWrapperId}${Elements.header}`;
    insertElement.appendChild(element);
    insertElement = element;

    //category label
    element = document.createElement('div');
    element.classList = 'col-sm-1';
    element.innerHTML = 'Category Group:';
    insertElement.appendChild(element);

    //category wrapper
    element = document.createElement('div');
    element.id = `${this.graphWrapperId}${Elements.categoryWrapper}`;
    element.classList = 'col-sm-3';
    insertElement.appendChild(element);
    insertElement = element;

    //category select
    element = document.createElement('select');
    element.id = `${this.graphWrapperId}${Elements.categorySelect}`;
    element.classList = 'form-control';

    this.categories.forEach(category => {
        element.add(new Option(`${category}`, `${category}`));
    });
    element.value = this.selectedCategory.val;
    insertElement.appendChild(element);

    //graph type label
    insertElement = document.getElementById(`${this.graphWrapperId}${Elements.header}`);
    element = document.createElement('div');
    element.classList = 'col-sm-1';
    element.innerHTML = 'Graph Type:';
    insertElement.appendChild(element);

    //graph type wrapper
    element = document.createElement('div');
    element.id = `${this.graphWrapperId}${Elements.graphTypeWrapper}`;
    element.classList = 'col-sm-2';
    insertElement.appendChild(element);
    insertElement = element;

    //graph type select
    element = document.createElement('select');
    element.id = `${this.graphWrapperId}${Elements.graphType}`;
    element.classList = 'form-control';
    element.add(new Option('Pie Chart', '0'));
    element.add(new Option('Bar Graph', '1'));
    insertElement.appendChild(element);

    //increments label
    insertElement = document.getElementById(`${this.graphWrapperId}${Elements.header}`);
    element = document.createElement('div');
    element.classList = 'col-sm-1';
    element.innerHTML = 'Increments:'
    insertElement.appendChild(element);

    //increments wrapper
    element = document.createElement('div');
    element.classList = 'col-sm-1';
    insertElement.appendChild(element);
    insertElement = element;

    //increments field
    element = document.createElement('input');
    element.setAttribute('type', 'number');
    element.setAttribute('min', '1');
    element.setAttribute('value', 1);
    element.classList = 'form-control'
    element.id = `${this.graphWrapperId}${Elements.increments}`;
    insertElement.appendChild(element);


    //create 2nd row
    insertElement = this.graphWrapper;
    element = document.createElement('div');
    element.classList = 'row';
    insertElement.appendChild(element);
    insertElement = element;
    element = document.createElement('div');
    element.id = `${this.graphWrapperId}${Elements.summary}`;
    element.classList = 'col-sm-12';
    element.style = 'opactiy: 0;';
    element.innerHTML = '<h1>Summary:</h1>category:<br />group:<br />percent:<br />count:<br />total:<br />';
    insertElement.appendChild(element);

    //create 3rd row
    insertElement = this.graphWrapper;
    element = document.createElement('div');
    element.classList = 'row';
    element.id = `${this.graphWrapperId}${Elements.sideBySide}`;
    insertElement.appendChild(element);
    insertElement = element;
    element = document.createElement('div');
    element.id = `${this.graphWrapperId}${Elements.graph}`;
    element.classList = 'col-sm-6 col-sm-offset-0';
    insertElement.appendChild(element);
    insertElement = element;

    element = document.createElement('canvas');
    element.id = `${this.graphWrapperId}${Elements.canvas}`;
    insertElement.appendChild(element);

    //create footer
    insertElement = document.getElementById(`${this.graphWrapperId}${Elements.sideBySide}`);
    element = document.createElement('div');
    element.id = `${this.graphWrapperId}${Elements.footer}`;
    element.classList = 'col-sm-6';
    insertElement.appendChild(element);
    insertElement = element;

    //create text area
    element = document.createElement('textarea');
    element.id = `${this.graphWrapperId}${Elements.hover_data_text}`;
    element.classList = 'form-control';
    element.setAttribute('readonly', '');
    element.style = `height: 100vh`;
    insertElement.appendChild(element);
}

export default SideBySide;
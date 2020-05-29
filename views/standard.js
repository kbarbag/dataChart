const { Elements } = require('../enums/enums.js');

const StandardView = function ({ graphWrapperId, categories, selectedCategory }) {
    this.graphWrapperId = graphWrapperId;
    this.graphWrapper = document.getElementById(this.graphWrapperId);
    this.categories = categories;
    this.selectedCategory = selectedCategory;
    return this;
}

StandardView.prototype.create = function () {
    //create first row (header)
    let insertElement = this.graphWrapper;
    let element = document.createElement('div');
    element.classList = 'row'
    element.id = `${this.graphWrapperId}${Elements.header}`;
    insertElement.appendChild(element);
    insertElement = element;

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


    //graph type wrapper
    insertElement = document.getElementById(`${this.graphWrapperId}${Elements.header}`);
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

    //create 2nd row
    insertElement = this.graphWrapper;
    element = document.createElement('div');
    element.id = `${this.graphWrapperId}${Elements.graph}`;
    element.classList = 'col-sm-12';
    insertElement.appendChild(element);
    insertElement = element;

    element = document.createElement('canvas');
    element.id = `${this.graphWrapperId}${Elements.canvas}`;
    element.style = 'max-height: 300px;';
    insertElement.appendChild(element);

    //create footer
    insertElement = this.graphWrapper;
    element = document.createElement('div');
    element.id = `${this.graphWrapperId}${Elements.footer}`;
    element.classList = 'col-sm-12';
    insertElement.appendChild(element);
    insertElement = element;

    element = document.createElement('textarea');
    element.id = `${this.graphWrapperId}${Elements.hover_data_text}`;
    element.classList = 'form-control';
    element.setAttribute('readonly', '');
    element.setAttribute('rows', 20);
    insertElement.appendChild(element);
}

export default StandardView;
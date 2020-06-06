const { Elements } = require('../enums/enums.js');

const Header = function ({ graphWrapperId, categories, selectedCategory }) {
    this.graphWrapperId = graphWrapperId;
    this.graphWrapper = document.getElementById(this.graphWrapperId);
    this.categories = categories;
    this.selectedCategory = selectedCategory;
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
    element.add(new Option('Bar Graph', '1', true, true));
    insertElement.appendChild(element);

    //increments label
    insertElement = document.getElementById(`${this.graphWrapperId}${Elements.header}`);
    element = document.createElement('div');
    element.id = `${this.graphWrapperId}${Elements.incrementsLbl}`
    element.classList = 'col-sm-1';
    element.innerHTML = 'Increments:'
    insertElement.appendChild(element);

    //increments wrapper
    element = document.createElement('div');
    element.id = `${this.graphWrapperId}${Elements.incrementsWrpr}`
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
    return;
}

export default Header;
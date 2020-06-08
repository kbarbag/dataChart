import Header from './header.js';
import Summary from './summary.js';

const { Elements } = require('../enums/enums.js');

const SideBySide = function ({ graphWrapperId, categories, selectedCategory }) {
    this.graphWrapperId = graphWrapperId;
    this.graphWrapper = document.getElementById(this.graphWrapperId);
    this.categories = categories;
    this.selectedCategory = selectedCategory;
    return this;
}

SideBySide.prototype.create = function () {
    new Header({ graphWrapperId: this.graphWrapperId, categories: this.categories, selectedCategory: this.selectedCategory });


    //create 2nd row
    new Summary({ graphWrapperId: this.graphWrapperId });

    //create 3rd row
    let insertElement = this.graphWrapper;
    let element = document.createElement('div');
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
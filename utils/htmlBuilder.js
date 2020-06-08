class HTMLElement {
    constructor(id) {
        this.element = document.getElementById(id);
    }
}

class HTMLBuilder {
    constructor({ id }) {
        this.htmlElement = new HTMLElement(id);
    }

    createDiv({ id = '', insertId = '', classes = '', html = '', style, makeChild = false }) {
        let element = document.createElement('div');
        if (id !== '') element.id = id;
        if (classes !== '') element.classList = classes;
        if (html !== '') element.innerHTML = html;
        if (insertId !== '') this.htmlElement.element = document.getElementById(insertId);
        if (style !== undefined) element.style = style;
        this.htmlElement.element.appendChild(element);
        if (makeChild) this.htmlElement.element = element;
        return this;
    }

    createDivChild({ id = '', insertId = '', classes = '', html = '' }) {
        return this.createDiv({ id, insertId, classes, html, makeChild: true });
    }

    createSelect({ id = '', insertId = '', classes = '', options, selected }) {
        let element = document.createElement('select');
        if (id !== '') element.id = id;
        if (classes !== '') element.classList = classes;
        for (let [key, value] of Object.entries(options)) {
            element.add(new Option(`${key}`, `${value}`));
        }
        if (selected !== undefined) element.value = selected;
        if (insertId !== '') this.htmlElement.element = document.getElementById(insertId);
        this.htmlElement.element.appendChild(element);
        return this;
    }

    createElement({ id = '', classes = '', elementName = '', attrs, style }) {
        if (elementName === '') throw new Error('HTMLBuilder::createElement - elementName must be defined');
        let element = document.createElement(elementName);
        if (id !== '') element.id = id;
        if (classes !== '') element.classList = classes;
        if (attrs !== undefined) {
            for (let [key, value] of Object.entries(attrs)) {
                element.setAttribute(key, value);
            }
        }
        if (style !== undefined) element.style = style;
        this.htmlElement.element.appendChild(element);
        return this;
    }
}

export default HTMLBuilder;

"use strict";

const { BarGraph, PieChart } = require('./models/models.js');
const { Utilities } = require('./utils/utils.js');
const { Elements } = require('./enums/enums.js');
const { StandardView, SideBySide } = require('./views/views.js');

let canvas = {};
let mouse = { x: 0, y: 0 };
let graphType = { val: 0 };
let selectedCategory = { val: '' };
let rect = { left: 0, top: 0 };
let util = new Utilities();
let graphWrapperId = '';
let increments = { val: 1 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('mousemove', function (event) {
    let scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;
    mouse.x = (event.clientX - rect.left) * scaleX;
    mouse.y = (event.clientY - rect.top) * scaleY;
});

window.addEventListener('click', function (event) {
    let scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;
    let x = (event.clientX - rect.left) * scaleX;
    let y = (event.clientY - rect.top) * scaleY;
    console.log(`click: x(${x}), y(${y})`);
});

document.addEventListener('change', function (e) {
    if (e.target && e.target.id === `${graphWrapperId}${Elements.categorySelect}`) {
        console.log('changed values');
        console.log(e.srcElement.value);
        selectedCategory.val = e.srcElement.value;
    }
    if (e.target && e.target.id === `${graphWrapperId}${Elements.graphType}`) {
        graphType.val = parseInt(e.srcElement.value, 10);
        console.log(graphType);
    }
    if (e.target && e.target.id === `${graphWrapperId}${Elements.increments}`) {
        increments.val = parseInt(e.srcElement.value, 10);
    }
});

function privateFlattenArrayOfObjects(arr, set, onlyNumeric = false) {
    if (!arr || typeof arr !== 'object' || !Array.isArray(arr)) return { foo: 'bar' };
    let flattened;
    let obj;
    let keys;
    for (let i = 0; i < arr.length; i++) {
        obj = arr[i];
        if (onlyNumeric) {
            flattened = util.flatObjectNumbers(obj, '');
        } else {
            flattened = util.flatObject(obj, '');
        }
        arr[i] = flattened;
        keys = Object.keys(flattened);
        keys.forEach(key => {
            set.add(key);
        });
    }
    return arr;
}


let graph = function (data, graphWrapperId) {
    this.data = data;
    this.clonedData = JSON.parse(JSON.stringify(data));
    this.categories = new Set();
    privateFlattenArrayOfObjects(this.data, new Set());
    privateFlattenArrayOfObjects(this.clonedData, this.categories, true);
    this.selectedCategory = selectedCategory;
    const categoriesIterator = this.categories[Symbol.iterator]();
    selectedCategory.val = categoriesIterator.next().value;
    this.graphWrapperId = graphWrapperId;
    this.graphWrapper = document.getElementById(this.graphWrapperId);
    let sideView = new SideBySide({ graphWrapperId, categories: this.categories, selectedCategory });
    sideView.create();

    this.canvas = document.getElementById(`${this.graphWrapperId}${Elements.canvas}`);
    let graphWidth = window.innerWidth;
    this.canvas.width = graphWidth * 0.35;
    this.canvas.height = graphWidth * 0.35;
    this.context = this.canvas.getContext('2d');
    this.rect = this.canvas.getBoundingClientRect();
    this.mouse = mouse;
    this.graphType = graphType;
    this.increments = increments;


    canvas = this.canvas;
    rect = this.rect;


    return this;
}

graph.prototype.draw = function () {
    graphWrapperId = `${this.graphWrapperId}`;
    this.canvas = document.getElementById(`${this.graphWrapperId}${Elements.canvas}`);
    this.context = this.canvas.getContext('2d');
    this.rect = this.canvas.getBoundingClientRect();
    this.increments = increments;
    rect = this.rect;

    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.context.font = '1.4em sans-serif';
    let groupBy = 'followers_count.$numberInt';
    if (this.selectedCategory.val) {
        groupBy = this.selectedCategory.val;
    }

    if (this.graphType.val === 0) {
        let pieChart = new PieChart({ data: this.data, canvasId: `${this.graphWrapperId}${Elements.canvas}`, mouse: this.mouse, selectedCategory: this.selectedCategory, graphWrapperId: this.graphWrapperId, increments: this.increments.val, })
        pieChart.draw();
    } else if (this.graphType.val === 1) {
        let summary = document.getElementById(`${this.graphWrapperId}${Elements.summary}`);
        summary.style = 'opacity: 0';
        let barGraph = new BarGraph({ data: this.data, canvasId: `${this.graphWrapperId}${Elements.canvas}`, mouse: this.mouse, category: this.selectedCategory.val, graphWrapperId: this.graphWrapperId });
        barGraph.draw();
    }

    window.requestAnimationFrame(this.draw.bind(this));
}

module.exports = { graph };
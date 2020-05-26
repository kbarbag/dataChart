"use strict";

const { Arc, Bar, BarGraph } = require('./models/models.js');
// const { flatObject, getNextHexColor } = require('./utils/utils.js');
const { Utilities } = require('./utils/utils.js');

let mouse = { x: 0, y: 0 };
let canvas = {};
let selectedCategory = {};
let rect = { left: 0, top: 0 };
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let util = new Utilities();

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
    if (e.target && e.target.id == 'category_select') {
        console.log('changed values');
        console.log(e.srcElement.value);
        selectedCategory.val = e.srcElement.value;
    }
});

function privateFlattenArrayOfObjects(arr, set) {
    if (!arr || typeof arr !== 'object' || !Array.isArray(arr)) return { foo: 'bar' };
    let flattened;
    let obj;
    let keys;
    for (let i = 0; i < arr.length; i++) {
        obj = arr[i];
        flattened = util.flatObjectNumbers(obj, '');
        arr[i] = flattened;
        keys = Object.keys(flattened);
        keys.forEach(key => {
            set.add(key);
        });
    }
    return arr;
}


let graph = function (data, graphId) {
    this.data = data;
    this.graphId = graphId;
    this.canvas = document.getElementById(this.graphId);
    let parent = this.canvas.parentElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');
    this.rect = this.canvas.getBoundingClientRect();
    this.mouse = mouse;
    this.selectedCategory = selectedCategory;
    this.categories = new Set();
    privateFlattenArrayOfObjects(this.data, this.categories);

    //create <SELECT> element to switch between data categories
    //default option should be first item in list
    let element = document.createElement('select');
    element.id = 'category_select';
    let catItr = this.categories[Symbol.iterator]();
    this.category = catItr.next().value;
    this.selectedCategory.val = 'followers_count.$numberInt';

    this.categories.forEach(category => {
        element.add(new Option(`${category}`, `${category}`));
    });
    parent.insertBefore(element, this.canvas);

    canvas = this.canvas;
    rect = this.rect;


    return this;
}


graph.prototype.temp = function () {
    console.log('i can confirm that i was called');
    console.log('graphid: ', this.graphId);
    return this;
}

graph.prototype.draw = function () {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.context.font = '1.4em sans-serif';
    let groupBy = 'followers_count.$numberInt';
    let startColor = 0;
    let colors;
    if (this.selectedCategory.val) {
        groupBy = this.selectedCategory.val;
    }

    let barGraph = new BarGraph(this.data, this.graphId, this.mouse, this.selectedCategory.val);
    barGraph.draw();


    //draw pie chart
    let groupings = {};
    for (let i = 0; i < this.data.length; i++) {
        let user = this.data[i];
        let group = user[groupBy];
        let category = '100+';
        if (group < 100) {
            category = (Math.floor(group / 10)) * 10;
            category = category + ' - ' + (category + 10);
        }
        if (!(category in groupings)) groupings[category] = [];
        groupings[category].push(user);
    }
    let x = this.canvas.width / 2, y = this.canvas.height / 2;
    let radius = (this.canvas.height / 2) * 0.4;
    x = radius + 50;
    let startAngle = 0, endAngle = 0;

    let lastPercent = 0;
    let fillColor = '';
    startColor = 0;
    for (let [key, value] of Object.entries(groupings)) {
        colors = util.getNextHexColor(startColor);
        startColor = colors.decimal;
        fillColor = colors.hex;
        let groupCount = value.length;
        let groupPercent = groupCount / this.data.length;
        lastPercent += groupPercent;
        startAngle = endAngle;
        endAngle = 2 * Math.PI * (1 - (lastPercent));
        let arc = new Arc({ x, y, radius, startAngle, endAngle, fill: fillColor, stroke: fillColor, text: `${key}`, data: value, graphId: this.graphId, mouse });
        arc.draw();
    }
    window.requestAnimationFrame(this.draw.bind(this));
}

module.exports = { graph };
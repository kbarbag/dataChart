"use strict";

const { BarGraph, PieChart } = require('./models/models.js');
const { Utilities } = require('./utils/utils.js');

let canvas = {};
let mouse = { x: 0, y: 0 };
let graphType = { val: 0 };
let selectedCategory = {};
let rect = { left: 0, top: 0 };
let util = new Utilities();

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
    if (e.target && e.target.id === 'category_select') {
        console.log('changed values');
        console.log(e.srcElement.value);
        selectedCategory.val = e.srcElement.value;
    }
    if (e.target && e.target.id === 'chart_select') {
        graphType.val = parseInt(e.srcElement.value, 10);
        console.log(graphType);
    }
});

// document.addEventListener();
// Select the node that will be observed for mutations
const targetNode = document.querySelector('body');

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        } else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
observer.disconnect();

function privateFlattenArrayOfObjects(arr, set) {
    if (!arr || typeof arr !== 'object' || !Array.isArray(arr)) return { foo: 'bar' };
    let flattened;
    let obj;
    let keys;
    for (let i = 0; i < arr.length; i++) {
        obj = arr[i];
        flattened = util.flatObject(obj, '');
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
    this.graphType = graphType;
    this.selectedCategory = selectedCategory;
    this.categories = new Set();
    privateFlattenArrayOfObjects(this.data, this.categories);

    //create <SELECT> element to switch between data categories
    //default option should be first item in list
    let element = document.createElement('select');
    element.id = 'category_select';
    // let catItr = this.categories[Symbol.iterator]();
    // this.category = catItr.next().value;
    this.selectedCategory.val = 'followers_count.$numberInt';

    this.categories.forEach(category => {
        element.add(new Option(`${category}`, `${category}`));
    });
    element.value = this.selectedCategory.val;
    parent.insertBefore(element, this.canvas);

    element = document.createElement('select');
    element.id = 'chart_select';
    element.add(new Option('Pie Chart', '0'));
    element.add(new Option('Bar Graph', '1'));
    parent.insertBefore(element, this.canvas);

    element = document.createElement('textarea');
    element.id = 'hover_data_text';
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
    this.rect = this.canvas.getBoundingClientRect();
    rect = this.rect;

    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.context.font = '1.4em sans-serif';
    let groupBy = 'followers_count.$numberInt';
    if (this.selectedCategory.val) {
        groupBy = this.selectedCategory.val;
    }

    if (this.graphType.val === 0) {
        let pieChart = new PieChart(this.data, this.graphId, this.mouse, this.selectedCategory.val);
        pieChart.draw();
    } else if (this.graphType.val === 1) {
        let barGraph = new BarGraph(this.data, this.graphId, this.mouse, this.selectedCategory.val);
        barGraph.draw();
    }

    window.requestAnimationFrame(this.draw.bind(this));
}

module.exports = { graph };
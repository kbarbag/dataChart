"use strict";

const { BarGraph, PieChart } = require('./models/models.js');
const { Utilities } = require('./utils/utils.js');
const { Elements } = require('./enums/enums.js');
const { StandardView, SideBySide } = require('./views/views.js');

let util = new Utilities();

window.dataChartCanvas = {};
window.dataChartCanvas.width = window.innerWidth;
window.dataChartCanvas.height = window.innerHeight;
window.dataChartCanvasMouse = { x: 0, y: 0 };
window.dataChartViewType = { val: 0, changed: false };
window.dataChartCanvasRect = { left: 0, top: 0 };
window.dataChartGraphWrapperId = '';
window.dataChartGraph = {};

window.addEventListener('mousemove', function (event) {
    let scaleX = window.dataChartCanvas.width / window.dataChartCanvasRect.width,
        scaleY = window.dataChartCanvas.height / window.dataChartCanvasRect.height;
    window.dataChartCanvasMouse.x = (event.clientX - window.dataChartCanvasRect.left) * scaleX;
    window.dataChartCanvasMouse.y = (event.clientY - window.dataChartCanvasRect.top) * scaleY;
});

document.addEventListener('change', function (e) {
    if (e.target && e.target.id === `${window.dataChartGraphWrapperId}${Elements.categorySelect}`) {
    }
    if (e.target && e.target.id === `${window.dataChartGraphWrapperId}${Elements.graphType}`) {
    }
    if (e.target && e.target.id === `${window.dataChartGraphWrapperId}${Elements.increments}`) {
    }
    if (e.target && e.target.id === `${window.dataChartGraphWrapperId}${Elements.viewType}`) {
        window.dataChartViewType.val = parseInt(e.srcElement.value, 10);
        window.dataChartViewType.changed = true;
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
    window.dataChartGraphWrapperId = graphWrapperId;
    this.data = data;
    this.clonedData = JSON.parse(JSON.stringify(data));
    this.categories = new Set();
    privateFlattenArrayOfObjects(this.data, new Set());
    privateFlattenArrayOfObjects(this.clonedData, this.categories, true);
    const categoriesIterator = this.categories[Symbol.iterator]();
    this.graphWrapper = document.getElementById(window.dataChartGraphWrapperId);
    new SideBySide({ categories: this.categories }).create();

    return this;
}

graph.prototype.draw = function () {
    if (window.dataChartViewType.changed) {
        //clear the content before redrawing the new view type
        document.getElementById(window.dataChartGraphWrapperId).innerHTML = '';
        if (window.dataChartViewType.val === 0) {
            new SideBySide({ categories: this.categories }).create();
        } else {
            new StandardView({ categories: this.categories }).create();
        }
        window.dataChartViewType.changed = false;
    }
    let canvasWrapper = document.getElementById(`${window.dataChartGraphWrapperId}${Elements.graph}`);
    let canvasWrapperStyle = getComputedStyle(canvasWrapper);
    let canvasWrapperWidth = parseInt(canvasWrapperStyle.width.substring(0, canvasWrapperStyle.width.length - 2), 10) * 0.8;
    window.dataChartCanvas.width = canvasWrapperWidth;
    window.dataChartCanvas.height = canvasWrapperWidth;

    window.dataChartCanvas = document.getElementById(`${window.dataChartGraphWrapperId}${Elements.canvas}`);
    window.dataChartGraph = window.dataChartCanvas.getContext('2d');
    window.dataChartCanvasRect = window.dataChartCanvas.getBoundingClientRect();

    window.dataChartGraph.clearRect(0, 0, window.innerWidth, window.innerHeight);
    window.dataChartGraph.font = '1.4em sans-serif';

    let incrementsWrpr = document.getElementById(`${window.dataChartGraphWrapperId}${Elements.incrementsWrpr}`);
    let incrementsLbl = document.getElementById(`${window.dataChartGraphWrapperId}${Elements.incrementsLbl}`);

        let pieChart = new PieChart({ data: this.data, canvasId: `${window.dataChartGraphWrapperId}${Elements.canvas}` })
        pieChart.draw();
        incrementsWrpr.style = 'opacity: 1';
        incrementsLbl.style = 'opacity: 1';
        let summary = document.getElementById(`${window.dataChartGraphWrapperId}${Elements.summary}`);
        summary.style = 'opacity: 0';
        incrementsWrpr.style = 'opacity: 0';
        incrementsLbl.style = 'opacity: 0';
        let barGraph = new BarGraph({ data: this.data, canvasId: `${window.dataChartGraphWrapperId}${Elements.canvas}` });
        barGraph.draw();
    }

    window.requestAnimationFrame(this.draw.bind(this));
}

module.exports = { graph };
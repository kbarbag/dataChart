import Arc from './arc.js';
import getNextHexColor from '../utils/hexColors.js';

const PieChart = function ({ data, canvasId, mouse, selectedCategory, spacer = 0, fill = '', stroke = '', graphWrapperId, increments }) {
    this.data = data;
    this.canvasId = canvasId;
    this.mouse = mouse;
    this.selectedCategory = selectedCategory;
    this.spacer = spacer;
    this.fill = fill;
    this.stroke = stroke;
    this.graphWrapperId = graphWrapperId;
    this.increments = increments;
    this.canvas = document.getElementById(this.canvasId);;
    this.graph = this.canvas.getContext('2d');
    return this;
}

PieChart.prototype.draw = function () {
    //draw pie chart
    let groupings = {};
    for (let i = 0; i < this.data.length; i++) {
        let user = this.data[i];
        let group = user[this.selectedCategory.val];
        let category = '100+';
        category = (Math.floor(group / this.increments)) * this.increments;
        category = category + ' - ' + (category + this.increments - 1);
        if (!(category in groupings)) groupings[category] = [];
        groupings[category].push(user);
    }
    let x = this.canvas.width / 2, y = this.canvas.height / 2;
    let radius = (this.canvas.height / 2) * 0.9;
    // x = radius + 50;
    let startAngle = 0, endAngle = 0;

    let lastPercent = 0;
    let fillColor = '';
    let colors;
    let startColor = 0;
    let summary = {};
    for (let [key, value] of Object.entries(groupings)) {
        colors = getNextHexColor(startColor);
        startColor = colors.decimal;
        fillColor = colors.hex;
        let groupCount = value.length;
        let groupPercent = groupCount / this.data.length;
        summary.category = this.selectedCategory.val;
        summary.group = key;
        summary.percent = (Math.floor(groupPercent * 10000) / 100) + '%';
        summary.count = groupCount;
        summary.total = this.data.length;
        lastPercent += groupPercent;
        startAngle = endAngle;
        endAngle = 2 * Math.PI * (1 - (lastPercent));
        let arc = new Arc({ x, y, radius, startAngle, endAngle, fill: fillColor, stroke: fillColor, text: `${key}`, data: value, canvasId: this.canvasId, mouse: this.mouse, graphWrapperId: this.graphWrapperId, summary });
        arc.draw();
    }
}

export default PieChart;
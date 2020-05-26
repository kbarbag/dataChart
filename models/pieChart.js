import Arc from './arc.js';
import getNextHexColor from '../utils/hexColors.js';

const PieChart = function (data, graphId, mouse, category, spacer = 0, fill = '', stroke = '') {
    this.spacer = spacer;
    this.fill = fill;
    this.stroke = stroke;
    this.data = data;
    this.graphId = graphId;
    this.canvas = document.getElementById(this.graphId);;
    this.graph = this.canvas.getContext('2d');
    this.mouse = mouse;
    this.category = category;
    return this;
}

PieChart.prototype.draw = function () {
    //draw pie chart
    let groupings = {};
    for (let i = 0; i < this.data.length; i++) {
        let user = this.data[i];
        let group = user[this.category];
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
    let colors;
    let startColor = 0;
    for (let [key, value] of Object.entries(groupings)) {
        colors = getNextHexColor(startColor);
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
}

export default PieChart;
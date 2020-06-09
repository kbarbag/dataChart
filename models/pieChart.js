import Arc from './arc.js';
import getNextHexColor from '../utils/hexColors.js';

const PieChart = function ({ data, spacer = 0, fill = '', stroke = '' }) {
    this.data = data;
    this.spacer = spacer;
    this.fill = fill;
    this.stroke = stroke;
    return this;
}

PieChart.prototype.draw = function () {
    //draw pie chart
    let groupings = {};
    for (let i = 0; i < this.data.length; i++) {
        let user = this.data[i];
        let group = user[window.dataChartSelectedCategory];
        let category = '100+';
        category = (Math.floor(group / window.dataChartPieGraphIncrements)) * window.dataChartPieGraphIncrements;
        category = category + ' - ' + (category + window.dataChartPieGraphIncrements - 1);
        if (!(category in groupings)) groupings[category] = [];
        groupings[category].push(user);
    }
    let x = window.dataChartCanvas.width / 2, y = window.dataChartCanvas.height / 2;
    let radius = (window.dataChartCanvas.height / 2) * 0.9;
    let startAngle = 0, endAngle = 0;

    let lastPercent = 0;
    let colors;
    let startColor = 0;
    let summary = {};
    for (let [key, value] of Object.entries(groupings)) {
        colors = getNextHexColor(startColor);
        startColor = colors.decimal;
        let groupCount = value.length;
        let groupPercent = groupCount / this.data.length;
        summary.category = window.dataChartSelectedCategory;
        summary.group = key;
        summary.percent = (Math.floor(groupPercent * 10000) / 100) + '%';
        summary.count = groupCount;
        summary.total = this.data.length;
        lastPercent += groupPercent;
        startAngle = endAngle;
        endAngle = 2 * Math.PI * (1 - (lastPercent));
        let arc = new Arc({ x, y, radius, startAngle, endAngle, fillColor: colors.hex, hoverColor: colors.hover, text: `${key}`, data: value, summary });
        arc.draw();
    }
}

export default PieChart;
import Bar from './bar.js';
import getNextHexColor from '../utils/hexColors.js';

const BarGraph = function (data, graphId, mouse, category, spacer = 0, fill = '', stroke = '') {
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

BarGraph.prototype.draw = function () {
    //draw bar graph
    let spacer = ((this.data.length + 10) / this.data.length) * 10;
    let barWidth = (this.canvas.width / this.data.length) - (spacer / 1);
    let space = spacer;
    let maxVal, minVal;
    let colors;
    let startColor = 0;
    for (let i = 0; i < this.data.length; i++) {
        maxVal = maxVal ? Math.max(maxVal, this.data[i][this.category]) : this.data[i][this.category];
        minVal = minVal ? Math.min(minVal, this.data[i][this.category]) : this.data[i][this.category];
    }
    let chartHeight = maxVal * 1.25;
    for (let i = 0; i < this.data.length; i++) {
        let x = Math.floor(i * (barWidth + space / 2) + ((i + 1) * (space / 2)));
        let user = this.data[i];
        let compareData = user[this.category];
        let height = Math.floor((compareData / chartHeight) * this.canvas.height);
        colors = getNextHexColor(startColor);
        startColor = colors.decimal;
        let fillColor = colors.hex;
        let bar = new Bar(x, this.canvas.height - height, barWidth, height, spacer, `${fillColor}`, `${fillColor}`, user, compareData, this.graphId, this.mouse);
        bar.draw();
    }
}

export default BarGraph;
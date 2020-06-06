import Bar from './bar.js';
import Line from './line.js';

import getNextHexColor from '../utils/hexColors.js';
import { Elements } from '../enums/enums.js';

const BarGraph = function ({ data, canvasId, graphWrapperId, mouse, category, spacer = 0, fill = '', stroke = '' }) {
    this.spacer = spacer;
    this.fill = fill;
    this.stroke = stroke;
    this.data = data;
    this.graphWrapperId = graphWrapperId;
    this.canvasId = canvasId;
    this.canvas = document.getElementById(this.canvasId);;
    this.graph = this.canvas.getContext('2d');
    this.rect = this.canvas.getBoundingClientRect();
    this.mouse = mouse;
    this.category = category;
    this.padding = 30;
    return this;
}

BarGraph.prototype.draw = function () {
    //draw bar graph
    //use smaller spacer for the side by side view
    let spacer = 5;//((this.data.length + 10) / this.data.length) * 10;
    let barWidth = ((this.canvas.width - this.padding) / this.data.length) - (spacer / 1);
    let space = spacer;
    let maxVal, minVal;
    let colors;
    let startColor = 0;
    for (let i = 0; i < this.data.length; i++) {
        maxVal = maxVal ? Math.max(maxVal, this.data[i][this.category]) : this.data[i][this.category];
        minVal = minVal ? Math.min(minVal, this.data[i][this.category]) : this.data[i][this.category];
    }
    let chartHeight = maxVal * 1.25;
    new Line({ x1: this.padding, y1: this.canvas.height, x2: this.padding, y2: 0, stroke: '', canvasId: this.canvasId });
    new Line({ x1: 0, y1: this.canvas.height - this.padding, x2: this.canvas.width, y2: this.canvas.height - this.padding, stroke: 'red', canvasId: this.canvasId });
    new Line({ x1: this.padding, y1: this.canvas.height * 0.25, x2: this.canvas.width, y2: this.canvas.height * 0.25, stroke: 'blue', canvasId: this.canvasId });
    new Line({ x1: this.padding, y1: this.canvas.height * 0.5, x2: this.canvas.width, y2: this.canvas.height * 0.5, stroke: 'green', canvasId: this.canvasId });
    new Line({ x1: this.padding, y1: this.canvas.height * 0.75, x2: this.canvas.width, y2: this.canvas.height * 0.75, stroke: 'orange', canvasId: this.canvasId });


    //draw background
    //get top, left, right, and bottom margins
    console.log('this.rect: ', this.rect);
    //create two lines for the x and y with an intersection on the bottom left
    //create 5 horizontal lines (-1 for the original horizontal line fromt the previous step)
    //add numbers to the left of the horizontal lines

    //draw each bar
    for (let i = 0; i < this.data.length; i++) {
        let x = Math.floor(i * (barWidth + space / 2) + ((i + 1) * (space / 2))) + this.padding;
        let user = this.data[i];
        let compareData = user[this.category];
        let height = Math.floor((compareData / chartHeight) * (this.canvas.height - this.padding));
        colors = getNextHexColor(startColor);
        startColor = colors.decimal;
        let fillColor = colors.hex;
        let bar = new Bar({ x, y: this.canvas.height - height - this.padding - 3, width: barWidth, height, minHeight: 10, spacer, fill: `${fillColor}`, hover: colors.hover, data: user, text: compareData, canvasId: this.canvasId, mouse: this.mouse, graphWrapperId: this.graphWrapperId });
        bar.draw();
    }
}

export default BarGraph;
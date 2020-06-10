import Bar from './bar.js';
import Line from './line.js';

import getNextHexColor from '../utils/hexColors.js';
import hsbToRgb from '../utils/hsbToRgb.js';

const BarGraph = function ({ data, spacer = 0, fill = '', stroke = '' }) {
    this.spacer = spacer;
    this.fill = fill;
    this.stroke = stroke;
    this.data = data;
    this.padding = 30;
    return this;
}

BarGraph.prototype.draw = function () {
    //draw bar graph
    let spacer = 5;
    let barWidth = ((window.dataChartCanvas.width - this.padding) / this.data.length) - (spacer / 1);
    let space = spacer;
    let maxVal, minVal;
    let colors;
    let startColor = 0;
    for (let i = 0; i < this.data.length; i++) {
        maxVal = maxVal ? Math.max(maxVal, this.data[i][window.dataChartSelectedCategory]) : this.data[i][window.dataChartSelectedCategory];
        minVal = minVal ? Math.min(minVal, this.data[i][window.dataChartSelectedCategory]) : this.data[i][window.dataChartSelectedCategory];
    }
    //make sure the tallest bar height is 10% smaller than the graph height
    let chartHeight = maxVal * 1.2;

    //Make graph background
    //Left line
    new Line({ x1: this.padding, y1: window.dataChartCanvas.height, x2: this.padding, y2: 0, stroke: '' });
    //Bottom line
    new Line({ x1: this.padding, y1: window.dataChartCanvas.height - 1, x2: window.dataChartCanvas.width, y2: window.dataChartCanvas.height - 1, stroke: 'red' });
    //Top line
    new Line({ x1: this.padding, y1: 1, x2: window.dataChartCanvas.width, y2: 1, stroke: 'black' });
    //Right line
    new Line({ x1: window.dataChartCanvas.width - 1, y1: 0, x2: window.dataChartCanvas.width - 1, y2: window.dataChartCanvas.height, stroke: 'black' });
    //75% line
    new Line({ x1: this.padding, y1: window.dataChartCanvas.height * 0.25, x2: window.dataChartCanvas.width, y2: window.dataChartCanvas.height * 0.25, stroke: 'blue' });
    //50% line
    new Line({ x1: this.padding, y1: window.dataChartCanvas.height * 0.5, x2: window.dataChartCanvas.width, y2: window.dataChartCanvas.height * 0.5, stroke: 'green' });
    //25% line
    new Line({ x1: this.padding, y1: window.dataChartCanvas.height * 0.75, x2: window.dataChartCanvas.width, y2: window.dataChartCanvas.height * 0.75, stroke: 'orange' });

    let lineText = '75%';
    window.dataChartGraph.fillStyle = 'blue';
    window.dataChartGraph.font = '1.0em Arial';
    let textMetrics = window.dataChartGraph.measureText(`${lineText}`);
    window.dataChartGraph.fillText(`${lineText}`, this.padding - textMetrics.width - 3, window.dataChartCanvas.height * 0.25);
    lineText = '50%';
    window.dataChartGraph.fillStyle = 'green';
    window.dataChartGraph.fillText(`${lineText}`, this.padding - textMetrics.width - 3, window.dataChartCanvas.height * 0.5);
    lineText = '25%';
    window.dataChartGraph.fillStyle = 'orange';
    window.dataChartGraph.fillText(`${lineText}`, this.padding - textMetrics.width - 3, window.dataChartCanvas.height * 0.75);

    //draw each bar
    for (let i = 0; i < this.data.length; i++) {
        let x = Math.floor(i * (barWidth + space / 2) + ((i + 1) * (space / 2))) + this.padding;
        let user = this.data[i];
        let compareData = user[window.dataChartSelectedCategory];
        let height = Math.floor((compareData / chartHeight) * (window.dataChartCanvas.height));
        switch (window.dataChartColorScheme) {
            case 0:
                colors = hsbToRgb(startColor);
                break;
            default:
                colors = getNextHexColor(startColor);
                break;
        }
        startColor = colors.decimal;
        let bar = new Bar({ x, y: window.dataChartCanvas.height - height - 3, width: barWidth, height, minHeight: 10, spacer, fillColor: colors.hex, hoverColor: colors.hover, data: user, text: compareData });
        bar.draw();
    }

}

export default BarGraph;
import { Arc, Bar } from './models/models.js';

let canvas = {};
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let rect = { left: 0, top: 0 };

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



let DataChart = function DataChart(data, graphId) {
    this.data = data;
    this.graphId = graphId;
    this.canvas = document.getElementById(this.graphId);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.graph = this.canvas.getContext('2d');
    this.rect = this.canvas.getBoundingClientRect();
    canvas = this.canvas;
    rect = this.rect;

    this.cycleHexColor = function (input) {
        input += 1;
        if (input === 7) input = 0;
        let bin = input.toString(2);
        bin = '000'.substring(bin.length) + bin;
        let returnHexColor = '#';
        for (let i = 0; i < bin.length; i++) {
            if (bin.charAt(i) === '1') returnHexColor += 'F';
            else returnHexColor += '0';
        }
        return { hex: returnHexColor, decimal: input };
    }

    this.draw = function () {
        this.graph.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.graph.font = '1.4em sans-serif';
        let groupBy = 'height';
        let maxVal, minVal;
        for (let i = 0; i < this.data.length; i++) {
            maxVal = maxVal ? Math.max(maxVal, this.data[i][groupBy]) : this.data[i][groupBy];
            minVal = minVal ? Math.min(minVal, this.data[i][groupBy]) : this.data[i][groupBy];
        }
        let spacer = ((this.data.length + 10) / this.data.length) * 10;
        let barWidth = (this.canvas.width / this.data.length) - (spacer / 1);
        let chartHeight = maxVal * 1.25;

        let startColor = 0;
        let space = spacer;
        let colors;
        //draw bar graph
        for (let i = 0; i < this.data.length; i++) {
            let x = Math.floor(i * (barWidth + space / 2) + ((i + 1) * (space / 2)));
            let user = this.data[i];
            let compareData = user[groupBy];
            let height = Math.floor((compareData / chartHeight) * this.canvas.height);
            colors = this.cycleHexColor(startColor);
            startColor = colors.decimal;
            let fillColor = colors.hex;
            let bar = new Bar(x, this.canvas.height - height, barWidth, height, spacer, `${fillColor}`, `${fillColor}`, user, compareData, this.graphId);
            bar.draw();
        }

        let groupings = {};
        for (let i = 0; i < this.data.length; i++) {
            let user = this.data[i];
            let group = user[groupBy];
            if (!(group in groupings)) groupings[group] = [];
            groupings[group].push(user.name);
        }
        let x = this.canvas.width / 2, y = this.canvas.height / 2;
        let radius = (this.canvas.height / 2) * 0.8;
        let startAngle = 0, endAngle = 0;

        let lastPercent = 0;
        let fillColor = '';
        startColor = 0;
        //draw pie chart
        for (let [key, value] of Object.entries(groupings)) {
            colors = this.cycleHexColor(startColor);
            startColor = colors.decimal;
            fillColor = colors.hex;
            let groupCount = value.length;
            let groupPercent = groupCount / this.data.length;
            lastPercent += groupPercent;
            startAngle = endAngle;
            endAngle = 2 * Math.PI * (1 - (lastPercent));
            let arc = new Arc(x, y, radius, startAngle, endAngle, fillColor, fillColor, `${key}`, this.graphId);
            arc.draw();
        }
    }
}

export default DataChart;
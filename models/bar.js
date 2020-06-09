const { Elements } = require('../enums/enums.js');

const Bar = function ({ x, y, width, height, minHeight, spacer = 0, fillColor, hoverColor, data, text }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hoverColor = hoverColor;
    this.minHeight = minHeight;
    this.spacer = spacer;
    this.fillColor = fillColor;
    this.data = data;
    this.text = text;
    return this;
}

Bar.prototype.draw = function () {
    if (window.dataChartCanvasMouse.x >= this.x && window.dataChartCanvasMouse.x < this.x + this.width && window.dataChartCanvasMouse.y > this.y - this.minHeight && window.dataChartCanvasMouse.y < this.y + this.height + this.minHeight) {
        window.dataChartGraph.fillStyle = this.hoverColor ? this.hoverColor : 'orange';
        let element = document.getElementById(`${window.dataChartGraphWrapperId}${Elements.hover_data_text}`);
        let text = JSON.stringify(this.data, null, 2);
        element.value = text;
    } else {
        window.dataChartGraph.fillStyle = this.fillColor ? this.fillColor : 'cyan';
    }
    window.dataChartGraph.fillRect(this.x, this.y - this.minHeight, this.width, this.height + this.minHeight);
    let textMetrics = window.dataChartGraph.measureText(`${this.text}`);
    window.dataChartGraph.fillStyle = 'red';
    window.dataChartGraph.font = '1.0em Arial';
    window.dataChartGraph.fillText(`${this.text}`, this.x + (this.width / 2) - (textMetrics.width / 2), this.y - this.minHeight - 8);
}

export default Bar;
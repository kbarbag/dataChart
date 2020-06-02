const { Elements } = require('../enums/enums.js');

const Bar = function ({ x, y, width, height, minHeight, spacer = 0, fill = '', stroke = '', data, text, canvasId, mouse, graphWrapperId }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.minHeight = minHeight;
    this.spacer = spacer;
    this.fill = fill;
    this.stroke = stroke;
    this.data = data;
    this.text = text;
    this.graphWrapperId = graphWrapperId;
    this.canvas = document.getElementById(canvasId);;
    this.graph = this.canvas.getContext('2d');
    this.mouse = mouse;
    return this;
}

Bar.prototype.draw = function () {
    if (this.mouse.x >= this.x && this.mouse.x < this.x + this.width && this.mouse.y > this.canvas.height - this.height - this.minHeight && this.mouse.y < this.canvas.height + this.minHeight) {
        this.graph.fillStyle = 'orange';
        let element = document.getElementById(`${this.graphWrapperId}${Elements.hover_data_text}`);
        let text = JSON.stringify(this.data, null, 2);
        element.value = text;
    } else {
        this.graph.fillStyle = this.fill !== '' ? this.fill : 'cyan';
    }
    this.graph.fillRect(this.x, this.canvas.height - this.height - this.minHeight, this.width, this.height + this.minHeight);
    let textMetrics = this.graph.measureText(`${this.text}`);
    this.graph.fillStyle = 'red';
    this.graph.font = '1.5em Arial';
    this.graph.fillText(`${this.text}`, this.x + (this.width / 2) - (textMetrics.width / 2), this.canvas.height - this.height - this.minHeight - 8);
}

export default Bar;
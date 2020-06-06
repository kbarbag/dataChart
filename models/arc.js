const { Elements } = require('../enums/enums.js');
import jsonToHTML from '../utils/jsonToHTML.js';

const Arc = function ({ x, y, radius, startAngle, endAngle, fill = '', stroke = '', hover = '', text = '', data, canvasId, mouse, graphWrapperId, summary }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle === 0 ? 2 * Math.PI : startAngle;
    this.endAngle = endAngle;
    this.fill = fill;
    this.stroke = stroke;
    this.hover = hover;
    this.text = text;
    this.data = data;
    this.canvas = document.getElementById(canvasId);
    this.graph = this.canvas.getContext('2d');
    this.mouse = mouse;
    this.graphWrapperId = graphWrapperId;
    this.summary = summary;
    return this;
}

Arc.prototype.draw = function () {
    this.graph.beginPath();
    this.graph.fillStyle = this.fill !== '' ? this.fill : 'red';
    this.graph.strokeStyle = 'black';
    let clickAngle;
    if (this.mouse.y <= this.y) {
        clickAngle = ((360 - Math.atan2((this.y - this.mouse.y), (this.mouse.x - this.x)) * 180 / Math.PI) / 360) * 2 * Math.PI;
    } else {
        clickAngle = ((-Math.atan2((this.y - this.mouse.y), (this.mouse.x - this.x)) * 180 / Math.PI) / 360) * 2 * Math.PI;
    }

    let absPerimY = Math.sqrt(((1 * this.radius) ** 2) - ((this.mouse.x - this.x) ** 2));
    if (this.mouse.y < this.y + absPerimY && this.mouse.y > this.y - absPerimY) {
        if (clickAngle < this.startAngle && clickAngle > this.endAngle) {
            this.graph.fillStyle = this.hover ? this.hover : 'yellow';
            let element = document.getElementById(`${this.graphWrapperId}${Elements.hover_data_text}`);

            let text = JSON.stringify(this.data, null, 2);
            element.value = text;

            element = document.getElementById(`${this.graphWrapperId}${Elements.summary}`);
            element.style = 'opacity: 1';
            element.innerHTML = '<h1>Summary:</h1>' + jsonToHTML(this.summary);
        }
    }

    this.graph.moveTo(this.x, this.y);
    this.graph.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true);
    this.graph.closePath();
    this.graph.fill();

}

export default Arc;
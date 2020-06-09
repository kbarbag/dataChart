const { Elements } = require('../enums/enums.js');
import jsonToHTML from '../utils/jsonToHTML.js';

const Arc = function ({ x, y, radius, startAngle, endAngle, fillColor, hoverColor, text = '', data, summary }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle === 0 ? 2 * Math.PI : startAngle;
    this.endAngle = endAngle;
    this.fillColor = fillColor;
    this.hoverColor = hoverColor;
    this.text = text;
    this.data = data;
    this.summary = summary;
    return this;
}

Arc.prototype.draw = function () {
    window.dataChartGraph.beginPath();
    window.dataChartGraph.fillStyle = this.fillColor ? this.fillColor : 'red';
    window.dataChartGraph.strokeStyle = 'black';
    let clickAngle;
    if (window.dataChartCanvasMouse.y <= this.y) {
        clickAngle = ((360 - Math.atan2((this.y - window.dataChartCanvasMouse.y), (window.dataChartCanvasMouse.x - this.x)) * 180 / Math.PI) / 360) * 2 * Math.PI;
    } else {
        clickAngle = ((-Math.atan2((this.y - window.dataChartCanvasMouse.y), (window.dataChartCanvasMouse.x - this.x)) * 180 / Math.PI) / 360) * 2 * Math.PI;
    }

    let absPerimY = Math.sqrt(((1 * this.radius) ** 2) - ((window.dataChartCanvasMouse.x - this.x) ** 2));
    if (window.dataChartCanvasMouse.y < this.y + absPerimY && window.dataChartCanvasMouse.y > this.y - absPerimY) {
        if (clickAngle < this.startAngle && clickAngle > this.endAngle) {
            window.dataChartGraph.fillStyle = this.hoverColor ? this.hoverColor : 'yellow';
            let element = document.getElementById(`${window.dataChartGraphWrapperId}${Elements.hover_data_text}`);

            let text = JSON.stringify(this.data, null, 2);
            element.value = text;

            element = document.getElementById(`${window.dataChartGraphWrapperId}${Elements.summary}`);
            element.style = 'opacity: 1';
            element.innerHTML = '<h1>Summary:</h1>' + jsonToHTML(this.summary);
        }
    }

    window.dataChartGraph.moveTo(this.x, this.y);
    window.dataChartGraph.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true);
    window.dataChartGraph.closePath();
    window.dataChartGraph.fill();

}

export default Arc;
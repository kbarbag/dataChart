const { Elements } = require('../enums/enums.js');

const Arc = function ({ x, y, radius, startAngle, endAngle, fill = '', stroke = '', text = '', data, canvasId, mouse, graphWrapperId }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle === 0 ? 2 * Math.PI : startAngle;
    this.endAngle = endAngle;
    this.fill = fill;
    this.stroke = stroke;
    this.text = text;
    this.data = data;
    this.canvas = document.getElementById(canvasId);
    this.graph = this.canvas.getContext('2d');
    this.mouse = mouse;
    this.graphWrapperId = graphWrapperId;
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
            this.graph.fillStyle = 'yellow';
            let element = document.getElementById(`${this.graphWrapperId}${Elements.hover_data_text}`);

            let text = JSON.stringify(this.data, null, 2);
            element.value = text;
        }
    }

    this.graph.moveTo(this.x, this.y);
    this.graph.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true);
    this.graph.closePath();
    this.graph.fill();

}

export default Arc;
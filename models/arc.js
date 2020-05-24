const Arc = function (x, y, radius, startAngle, endAngle, fill = '', stroke = '', text = '', graphId, mouse) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle === 0 ? 2 * Math.PI : startAngle;
    this.endAngle = endAngle;
    this.fill = fill;
    this.stroke = stroke;
    this.text = text;
    this.canvas = document.getElementById(graphId);
    this.graph = this.canvas.getContext('2d');
    this.mouse = mouse;
    return this;
}

Arc.prototype.draw = function () {
    this.graph.beginPath();
    this.graph.fillStyle = this.fill !== '' ? this.fill : 'red';
    this.graph.strokeStyle = 'black';
    let clickAngle;
    // console.log('mouse: ', this.mouse);
    if (this.mouse.y <= this.y) {
        clickAngle = ((360 - Math.atan2((this.y - this.mouse.y), (this.mouse.x - this.x)) * 180 / Math.PI) / 360) * 2 * Math.PI;
    } else {
        clickAngle = ((-Math.atan2((this.y - this.mouse.y), (this.mouse.x - this.x)) * 180 / Math.PI) / 360) * 2 * Math.PI;
    }

    let absPerimY = Math.sqrt(((1 * this.radius) ** 2) - ((this.mouse.x - this.x) ** 2));
    if (this.mouse.y < this.y + absPerimY && this.mouse.y > this.y - absPerimY) {
        if (clickAngle < this.startAngle && clickAngle > this.endAngle) {
            this.graph.fillStyle = 'yellow';
        }
    }

    this.graph.moveTo(this.x, this.y);
    this.graph.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true);
    this.graph.closePath();
    this.graph.fill();

    //find center of arc for text
    this.graph.fillStyle = 'black';
    this.graph.font = '3.9em Courier';
    let textMetrics = this.graph.measureText(`${this.text}`);
    let midAngle = this.startAngle - ((this.startAngle - this.endAngle) / 2);
    let textX = (this.radius * 1.0) * (Math.cos(midAngle));
    let textY = (this.radius * 1.0) * (Math.sin(midAngle));
    // console.log(`textX: ${textX}, textY: ${textY}, width: ${this.canvas.width}, height: ${this.canvas.height}, startAngle: ${this.startAngle}, endAngle: ${this.endAngle}, midAngle: ${midAngle}, textMetrics: ${textMetrics.width}`);
    // console.log(textMetrics);
    if (textX > 0 && textY < 0) {
        //quad 1
        textX = (this.radius * 1.0) * (Math.cos(midAngle));
        textY = (this.radius * 1.0) * (Math.sin(midAngle));
    } else if (textX < 0 && textY > 0) {
        //quad 3
        textX = (this.radius * 1.25) * (Math.cos(midAngle));
        textY = (this.radius * 1.3) * (Math.sin(midAngle));
    } else {
        textX = (this.radius * 1.1) * (Math.cos(midAngle));
        textY = (this.radius * 1.1) * (Math.sin(midAngle));
    }
    textX = (this.canvas.width / 2) + textX;
    textY = (this.canvas.height / 2) + textY;
    this.graph.fillText(`${this.text}`, textX, textY);
    // console.log(`textX: ${textX}, textY: ${textY}, width: ${this.canvas.width}, height: ${this.canvas.height}, startAngle: ${this.startAngle}, endAngle: ${this.endAngle}, midAngle: ${midAngle}`);
}

export default Arc;
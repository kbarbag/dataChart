const Bar = function (x, y, width, height, spacer = 0, fill = '', stroke = '', data, text, graphId, mouse) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.spacer = spacer;
    this.fill = fill;
    this.stroke = stroke;
    this.data = data;
    this.text = text;
    this.canvas = document.getElementById(graphId);;
    this.graph = this.canvas.getContext('2d');
    this.mouse = mouse;
    return this;
}

Bar.prototype.draw = function () {
    if (this.mouse.x >= this.x && this.mouse.x < this.x + this.width && this.mouse.y > this.canvas.height - this.height && this.mouse.y < this.canvas.height) {
        this.graph.fillStyle = 'orange';
    } else {
        this.graph.fillStyle = this.fill !== '' ? this.fill : 'cyan';
    }
    this.graph.fillRect(this.x, this.canvas.height - this.height, this.width, this.height);
    let textMetrics = this.graph.measureText(`${this.text}`);
    // this.graph.strokeStyle = 'black';
    this.graph.fillStyle = 'red';
    this.graph.font = '1.5em Arial';
    // this.graph.color = 'yellow';
    this.graph.fillText(`${this.text}`, this.x + (this.width / 2) - (textMetrics.width / 2), this.canvas.height - this.height - 8);
}

export default Bar;
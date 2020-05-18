export default class Bar {
    constructor(x, y, width, height, spacer = 0, fill = '', stroke = '', data, text, graphId) {
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
    }

    draw = function () {
        if (mouse.x >= this.x && mouse.x < this.x + this.width && mouse.y > this.canvas.height - this.height && mouse.y < this.canvas.height) {
            this.graph.fillStyle = 'orange';
        } else {
            this.graph.fillStyle = this.fill !== '' ? this.fill : 'cyan';
        }
        this.graph.fillRect(this.x, this.canvas.height - this.height, this.width, this.height);
        let textMetrics = this.graph.measureText(`${this.text}`);
        this.graph.strokeStyle = 'black';
        this.graph.fillStyle = 'red';
        this.graph.font = '3.9em Arial';
        this.graph.color = 'yellow';
        this.graph.fillText(`${this.text}`, ((this.x + this.spacer) + ((this.width / 2) - (textMetrics.width / 2))), this.canvas.height - this.height - 8);
    }
}
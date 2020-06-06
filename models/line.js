const Line = function ({ x1, y1, x2, y2, stroke = '', canvasId }) {
    this.stroke = stroke;
    this.canvas = document.getElementById(canvasId);
    this.graph = this.canvas.getContext('2d');
    this.graph.beginPath();
    this.graph.strokeStyle = this.stroke !== '' ? this.stroke : 'black';
    this.graph.moveTo(x1, y1);
    this.graph.lineTo(x2, y2);
    this.graph.closePath();
    this.graph.stroke();
    return;
}

export default Line;
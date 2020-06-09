const Line = function ({ x1, y1, x2, y2, stroke = '' }) {
    this.stroke = stroke;
    window.dataChartGraph.beginPath();
    window.dataChartGraph.strokeStyle = this.stroke !== '' ? this.stroke : 'black';
    window.dataChartGraph.moveTo(x1, y1);
    window.dataChartGraph.lineTo(x2, y2);
    window.dataChartGraph.closePath();
    window.dataChartGraph.stroke();
    return;
}

export default Line;
export default class Arc {
    constructor(x, y, radius, startAngle, endAngle, fill = '', stroke = '', text = '', graphId) {
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
    }

    draw = function () {
        this.graph.beginPath();
        this.graph.fillStyle = this.fill !== '' ? this.fill : 'red';
        this.graph.strokeStyle = 'black';
        let clickAngle;
        if (mouse.y <= this.y) {
            clickAngle = ((360 - Math.atan2((this.y - mouse.y), (mouse.x - this.x)) * 180 / Math.PI) / 360) * 2 * Math.PI;
        } else {
            clickAngle = ((-Math.atan2((this.y - mouse.y), (mouse.x - this.x)) * 180 / Math.PI) / 360) * 2 * Math.PI;
        }

        let absPerimY = Math.sqrt(((1 * this.radius) ** 2) - ((mouse.x - this.x) ** 2));
        if (mouse.y < this.y + absPerimY && mouse.y > this.y - absPerimY) {
            if (clickAngle < this.startAngle && clickAngle > this.endAngle) {
                this.graph.fillStyle = 'yellow';
            }
        }

        this.graph.moveTo(this.x, this.y);
        this.graph.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true);
        this.graph.closePath();
        this.graph.fill();

        //find center of arc for text
        let midAngle = (this.startAngle - this.endAngle) / 2;
        let textX = (this.radius / 2) * (2 * Math.PI * Math.cos(midAngle));
        let textY = (this.radius / 2) * (2 * Math.PI * Math.sin(midAngle));
        this.graph.strokeStyle = 'black';
        this.graph.fillStyle = 'red';
        this.graph.font = '3.9em Courier';
        this.graph.color = 'yellow';
        let textMetrics = this.graph.measureText(`${this.text}`);
        // let textX = ((this.x + (this.spacer)) + ((this.width / 2) - (textMetrics.width / 2)));
        // textX = this.x + (this.width / 2) - (textMetrics.width / 2);
        // this.graph.fillText(`${this.text}`, textX, canvas.height / 2);
    }

    sayHi = (val) => {
        console.log(`saying: ${val}`);
    }
}
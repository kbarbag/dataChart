let userData = [{ name: "Fanny Nelson", age: 22, height: 4 },
{ name: "Bill Foster", age: 25, height: 7 },
{ name: "Willie Underwood", age: 23, height: 4 },
{ name: "Danny Brady", age: 24, height: 6 },
{ name: "Ricky Williamson", age: 24, height: 4 },
{ name: "Beulah Brock", age: 23, height: 7 },
{ name: "Cameron Salazar", age: 23, height: 5 },
{ name: "Corey Nguyen", age: 20, height: 3 },
{ name: "Mabel Murray", age: 22, height: 5 },
{ name: "Elva Garrett", age: 21, height: 5 }];

let mouse = { x: 0, y: 0 };


let canvas = document.getElementById('graph');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
graph = canvas.getContext('2d');

let element = document.getElementById('graph');
var rect = element.getBoundingClientRect();

window.addEventListener('mousemove', function (event) {
    let scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;
    mouse.x = (event.clientX - rect.left) * scaleX;
    mouse.y = (event.clientY - rect.top) * scaleY;
});

window.addEventListener('click', function (event) {
    let scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;
    let x = (event.clientX - rect.left) * scaleX;
    let y = (event.clientY - rect.top) * scaleY;
    console.log(`click: x(${x}), y(${y})`);
});

function cycleHexColor(input) {
    input += 1;
    if (input === 7) input = 0;
    let bin = input.toString(2);
    bin = '000'.substring(bin.length) + bin;
    let returnHexColor = '#';
    for (let i = 0; i < bin.length; i++) {
        if (bin.charAt(i) === '1') returnHexColor += 'F';
        else returnHexColor += '0';
    }
    return { hex: returnHexColor, decimal: input };
}

function draw() {
    graph.clearRect(0, 0, window.innerWidth, window.innerHeight);
    graph.font = '1.4em sans-serif';
    let groupBy = 'height';
    let maxVal, minVal;
    for (let i = 0; i < userData.length; i++) {
        maxVal = maxVal ? Math.max(maxVal, userData[i][groupBy]) : userData[i][groupBy];
        minVal = minVal ? Math.min(minVal, userData[i][groupBy]) : userData[i][groupBy];
    }
    let spacer = ((userData.length - 1) / userData.length) * 10;
    let barWidth = (canvas.width / userData.length) - (spacer / 1);
    let chartHeight = maxVal * 1.25;

    let startColor = 0;
    let space = spacer;
    //draw bar graph
    // for (let i = 0; i < userData.length; i++) {
    //     let space = spacer / 1; //i > 0 ? spacer / 1 : 0;
    //     let x = Math.floor(i * (barWidth + space / 2) + ((i + 1) * (space / 2)));
    //     let user = userData[i];
    //     let compareData = user[groupBy];
    //     let height = Math.floor((compareData / chartHeight) * canvas.height);
    //     let colors = cycleHexColor(startColor);
    //     startColor = colors.decimal;
    //     let fillColor = colors.hex;
    //     let bar = new Bar(x, canvas.height - height, barWidth, height, spacer, `${fillColor}`, `${fillColor}`, user, compareData);
    //     bar.draw();
    // }

    let groupings = {};
    for (let i = 0; i < userData.length; i++) {
        let user = userData[i];
        let group = user[groupBy];
        if (!(group in groupings)) groupings[group] = [];
        groupings[group].push(user.name);
    }
    let x = canvas.width / 2, y = canvas.height / 2;
    let radius = (canvas.height / 2) * 0.8;
    let startAngle = 0, endAngle = 0;

    let lastPercent = 0;
    let fillColor = '';
    startColor = 0;
    //draw pie chart
    for (let [key, value] of Object.entries(groupings)) {
        colors = cycleHexColor(startColor);
        startColor = colors.decimal;
        fillColor = colors.hex;
        let groupCount = value.length;
        let groupPercent = groupCount / userData.length;
        lastPercent += groupPercent;
        startAngle = endAngle;
        endAngle = 2 * Math.PI * (1 - (lastPercent));
        let arc = new Arc(x, y, radius, startAngle, endAngle, fillColor, fillColor);
        arc.draw();
    }
    window.requestAnimationFrame(draw);
}

function Bar(x, y, width, height, spacer = 0, fill = '', stroke = '', data, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.spacer = spacer;
    this.fill = fill;
    this.stroke = stroke;
    this.data = data;
    this.text = text;

    this.draw = function () {
        let element = document.getElementById('graph-wrapper');
        let rect = element.getBoundingClientRect();
        if (mouse.x >= this.x && mouse.x < this.x + this.width && mouse.y > canvas.height - this.height && mouse.y < canvas.height) {
            graph.fillStyle = 'orange';
        } else {
            graph.fillStyle = fill !== '' ? fill : 'cyan';
        }
        graph.fillRect(this.x, canvas.height - this.height, this.width, this.height);
        let textMetrics = graph.measureText(`${text}`);
        graph.strokeStyle = 'black';
        graph.fillStyle = 'red';
        graph.font = '3.9em Arial';
        graph.color = 'yellow';
        graph.fillText(`${text}`, ((this.x + this.spacer) + ((this.width / 2) - (textMetrics.width / 2))), canvas.height - this.height - 8);
    }
}

function Arc(x, y, radius, startAngle, endAngle, fill = '', stroke = '') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle === 0 ? 2 * Math.PI : startAngle;
    this.endAngle = endAngle;
    this.fill = fill;
    this.stroke = stroke;

    this.draw = function () {
        graph.beginPath();
        graph.fillStyle = this.fill !== '' ? this.fill : 'red';
        graph.strokeStyle = 'black';
        let clickAngle;
        if (mouse.y < this.y) {
            clickAngle = ((360 - Math.atan2((this.y - mouse.y), (mouse.x - this.x)) * 180 / Math.PI) / 360) * 2 * Math.PI;
        } else {
            clickAngle = ((-Math.atan2((this.y - mouse.y), (mouse.x - this.x)) * 180 / Math.PI) / 360) * 2 * Math.PI;
        }

        let absPerimY = Math.sqrt((this.radius ** 2) - ((mouse.x - this.x) ** 2));
        if (mouse.y < this.y + absPerimY && mouse.y > this.y - absPerimY) {
            if (clickAngle < this.startAngle && clickAngle > this.endAngle) {
                graph.fillStyle = 'yellow';
            }
        }
        graph.moveTo(this.x, this.y);
        graph.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true);
        graph.closePath();
        graph.fill();
    }
}

window.requestAnimationFrame(draw);
import { Arc, Bar } from './models/models.js';

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

const graphId = 'graph';

let canvas = document.getElementById(graphId);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let graph = canvas.getContext('2d');
let rect = canvas.getBoundingClientRect();

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
    let spacer = ((userData.length + 10) / userData.length) * 10;
    let barWidth = (canvas.width / userData.length) - (spacer / 1);
    let chartHeight = maxVal * 1.25;

    let startColor = 0;
    let space = spacer;
    let colors;
    //draw bar graph
    for (let i = 0; i < userData.length; i++) {
        let x = Math.floor(i * (barWidth + space / 2) + ((i + 1) * (space / 2)));
        let user = userData[i];
        let compareData = user[groupBy];
        let height = Math.floor((compareData / chartHeight) * canvas.height);
        colors = cycleHexColor(startColor);
        startColor = colors.decimal;
        let fillColor = colors.hex;
        let bar = new Bar(x, canvas.height - height, barWidth, height, spacer, `${fillColor}`, `${fillColor}`, user, compareData, graphId);
        bar.draw();
    }

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
        let arc = new Arc(x, y, radius, startAngle, endAngle, fillColor, fillColor, `${key}`, graphId);
        arc.draw();
    }
    window.requestAnimationFrame(draw);
}



window.requestAnimationFrame(draw);
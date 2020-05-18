let chance = new Chance();
let userData = [];
userData = [{ name: "Fanny Nelson", age: 22, height: 4 },
{ name: "Bill Foster", age: 25, height: 7 },
{ name: "Willie Underwood", age: 23, height: 4 },
{ name: "Danny Brady", age: 24, height: 6 },
{ name: "Ricky Williamson", age: 24, height: 4 },
{ name: "Beulah Brock", age: 23, height: 7 },
{ name: "Cameron Salazar", age: 23, height: 5 },
{ name: "Corey Nguyen", age: 20, height: 3 },
{ name: "Mabel Murray", age: 22, height: 5 },
{ name: "Elva Garrett", age: 21, height: 5 }];

// let maxAge = 0;
// let minAge = Infinity;
// let maxHeight = 0;
// let minHeight = Infinity;

// for (let i = 0; i < 10; i++) {
//     let data = {
//         name: chance.name(),
//         age: chance.integer({ min: 20, max: 25 }),
//         height: chance.integer({ min: 3, max: 8 })
//     };
//     maxAge = Math.max(maxAge, data.age);
//     minAge = Math.min(minAge, data.age);
//     maxHeight = Math.max(maxHeight, data.height);
//     minHeight = Math.min(minHeight, data.height);
//     userData.push(data);
// }

let canvas = document.getElementById('graph');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
graph = canvas.getContext('2d');
graph.strokeStyle = 'green';
graph.fillStyle = 'cyan';
graph.font = '1.4em sans-serif';
// graph.textAlign = 'center';
// graph.textBaseline = 'middle';
// graph.strokeRect(100, 100, 50, 50);
// graph.fillRect(300, 100, 50, 50);
// graph.strokeRect(298, 98, 54, 54);
// let spacer = 10;
// let barWidth = (canvas.width / userData.length) - spacer;
// let chartHeight = maxHeight * 1.25;
// console.log(userData);
// for (let i = 0; i < userData.length; i++) {
//     let space = i > 0 ? spacer : 0;
//     let user = userData[i];
//     let compareData = user.height;
//     // console.log(user.height);
//     let height = (compareData / chartHeight) * canvas.height;
//     console.log('height: ', height);
//     // graph.fillRect((i * barWidth) + space, canvas.height, barWidth, (user.height / chartHeight) * 100);
//     graph.fillRect(i * (barWidth + space), canvas.height - height - 1, barWidth, height);
//     graph.font = '1.4em sans-serif';
//     let text = graph.measureText(`${compareData}`);
//     console.log('text metrics: ', text);
//     graph.strokeText(`${compareData}`, i * (barWidth + space), canvas.height - height - 10);
// }
let groupBy = 'height';
let maxVal, minVal;
for (let i = 0; i < userData.length; i++) {
    maxVal = maxVal ? Math.max(maxVal, userData[i][groupBy]) : userData[i][groupBy];
    minVal = minVal ? Math.min(minVal, userData[i][groupBy]) : userData[i][groupBy];
}
let spacer = ((userData.length - 1) / userData.length) * 10;//10;
console.log('spacer: ', spacer);
let barWidth = (canvas.width / userData.length) - (spacer / 1);
let chartHeight = maxVal * 1.25;

for (let i = 0; i < userData.length; i++) {
    let space = spacer / 1; //i > 0 ? spacer / 1 : 0;
    let user = userData[i];
    let compareData = user[groupBy];
    let height = (compareData / chartHeight) * canvas.height;
    let x = i * (barWidth + space / 2) + ((i + 1) * (space / 2));
    // if (i === 0) x += space;
    graph.fillRect(x, canvas.height - height, barWidth, height);
    let text = graph.measureText(`${compareData}`);
    // console.log('text metrics: ', text);
    graph.strokeText(`${compareData}`, (i * (barWidth + spacer) + ((barWidth / 2) - (text.width / 2))), canvas.height - height - 8);
}
console.log('maxVal: ', maxVal);
console.log('window width: ', window.innerWidth);
console.log('window height: ', window.innerHeight);
console.log('canvas width: ', canvas.width);
console.log('canvas height: ', canvas.height);
console.log('bar width: ', barWidth);
console.log('chart height: ', chartHeight);
const { i7 } = require('./inputs');

let inputs = [
    'Step C must be finished before step A can begin.',
    'Step C must be finished before step F can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step F must be finished before step E can begin.'
];

//inputs = i7;
const pairs = [];
const obj = {};
inputs.forEach(item => {
    const s = item.split(' ');

    pairs.push([s[1], s[7]]);
    if (obj[s[7]]) {
        obj[s[7]].parents.push(s[1]);
    } else {
        obj[s[7]] = {
            count: 0,
            parents: [s[1]]
        };
    }
    if (!obj[s[1]]) {
        obj[s[1]] = {
            count: 0,
            parents: []
        };
    }
});
const letters = [];
for (let key in obj) {
    letters.push(key);
}
/*
inputs.forEach(item => {
    const s = item.split(' ');

    pairs.push([s[1], s[7]]);
    if (obj[s[7]]) {
        obj[s[7]].parents.push(s[1]);
    } else {
        obj[s[7]] = {
            count: 0,
            parents: [s[1]]
        };
    }
    if (!obj[s[1]]) {
        obj[s[1]] = {
            count: 0,
            parents: []
        };
    }
});*/
console.log(obj);
let line2 = [];
while (line2.length !== letters.length) {
    const tmp = [];
    for (let key in obj) {
        const parents = obj[key].parents.filter(item => {
            return line2.indexOf(item) < 0;
        });
        if (parents.length === 0) {
            tmp.push(key);
        }
    }

    if(tmp.length > 0) {
        console.log(tmp.sort());
        const l = tmp.sort()[0];
        line2.push(l);
        delete obj[l];
    }
}
console.log(line2.join(''));
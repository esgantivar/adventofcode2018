const { i6 } = require('./inputs');
let input = [
    { x: 1, y: 1 },
    { x: 1, y: 6 },
    { x: 8, y: 3 },
    { x: 3, y: 4 },
    { x: 5, y: 5 },
    { x: 8, y: 9 }
];
input = i6;

const dist = [];
const bounds = {
    x: 0,
    y: 0
};

input.forEach((a) => {
    if (a.x > bounds.x) {
        bounds.x = a.x;
    }
    if (a.y > bounds.y) {
        bounds.y = a.y;
    }
});

for (let i = 0; i <= bounds.x; i++) {
    const row = [];
    for (let j = 0; j <= bounds.y; j++) {
        const ds = [];
        for (let k = 0; k < input.length; k++) {
            ds.push(Math.abs(i - input[k].x) + Math.abs(j - input[k].y));
        }
        const min = Math.min(...ds);
        let freq = 0;
        ds.forEach((item) => {
            if (item === min) {
                freq += 1;
            }
        });
        row.push(freq === 1 ? ds.indexOf(min) : '.');
        //row.push(min);
    }
    dist.push(row);
}
const counters = [];
for (let k = 0; k < input.length; k++) {
    counters.push(getcount(k));
}

function getcount(k) {
    let c = 0;
    for (let i = 0; i < dist.length; i++) {
        for (let j = 0; j < dist[i].length; j++) {
            if (dist[i][j] === k) {
                if (i === 0 || j === 0 || i === bounds.x || j === bounds.y) {
                    return -Infinity;
                }
                c += 1;
            }
        }
    }
    return c;
}
const area = [];
for (let i = 0; i < dist.length; i++) {
    for (let j = 0; j < dist[i].length; j++) {
        //if (dist[i][j] !== '.') {
            area.push({
                parent: dist[i][j],
                x: i,
                y: j
            });
        //}
    }
}

area.forEach(item => {
    const dist = [];
    let total = 0;
    input.forEach(point => {
        const d = Math.abs(item.x - point.x) + Math.abs(item.y - point.y)
        dist.push(d);
        total += d;
    });
    item['dist'] = dist;
    item['total'] = total;
});
const safe =[]
area.forEach(item => {
    if(item.total < 10000) {
        safe.push(item);
    }
})
// console.table(safe);
console.log(safe.length);
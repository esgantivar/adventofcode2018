const { i4 } = require('./inputs')
let input = [
    '[1518-11-01 00:00] Guard #10 begins shift',
    '[1518-11-01 00:05] falls asleep',
    '[1518-11-01 00:25] wakes up',
    '[1518-11-01 00:30] falls asleep',
    '[1518-11-01 00:55] wakes up',
    '[1518-11-01 23:58] Guard #99 begins shift',
    '[1518-11-02 00:40] falls asleep',
    '[1518-11-02 00:50] wakes up',
    '[1518-11-03 00:05] Guard #10 begins shift',
    '[1518-11-03 00:24] falls asleep',
    '[1518-11-03 00:29] wakes up',
    '[1518-11-04 00:02] Guard #99 begins shift',
    '[1518-11-04 00:36] falls asleep',
    '[1518-11-04 00:46] wakes up',
    '[1518-11-05 00:03] Guard #99 begins shift',
    '[1518-11-05 00:45] falls asleep',
    '[1518-11-05 00:55] wakes up'
]
input = i4;

function parser(s) {
    const sp = s.split(']');
    const obj = {
        date: new Date(`${sp[0].trim().substring(1).replace(' ', 'T')}+0000`),
        action: sp[1].trim()
    }
    if (obj.action.startsWith('Guard')) {
        obj['id'] = getId(obj.action);
    }
    return obj
}

function check(val) {
    return val == null || val == undefined;
}

function getId(action) {
    const tmp = action.split(' ');
    let id = undefined;
    for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].indexOf('#') >= 0) {
            return Number(tmp[i].replace('#', '').trim());
        }
    }
    return undefined;
}

function clone(o) {
    return {
        id: o.id,
        actions: o.actions.map((item) => {
            return {
                date: new Date(item.date.getTime()),
                action: item.action
            };
        })
    };
}

const procesed = input.map((item) => {

    return parser(item);
});
const ordered = procesed.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
});

let filtered = ordered.filter((item) => {
    return true;
});

const obj = {};
filtered.forEach((item) => {
    if (item.id) {
        obj[item.id] = {
            minutes: [],
            counter: 0
        };
    }
});
let current = {};
const objs = [];
filtered.forEach((item) => {
    if (!check(item.id)) {
        if (!check(current.id)) {
            objs.push(clone(current));
        }
        current = {
            id: item.id,
            date: item.date,
            actions: []
        };
    } else {
        if (item.date.getUTCHours() === 0) {
            current.actions.push(item);
        }
    }
});
if (!check(current.id)) {
    objs.push(clone(current));
}
objs.forEach((item) => {
    let begin = undefined;
    item.actions.forEach((a) => {
        if (a.action === 'falls asleep') {
            begin = a.date;
        } else if (a.action === 'wakes up') {
            obj[item.id].counter += (a.date.getTime() - begin.getTime()) / (1000 * 60);
            const tmp = [];
            for (let inicio = begin.getUTCMinutes(); inicio < a.date.getUTCMinutes(); inicio++) {
                tmp.push(inicio);
            }
            obj[item.id].minutes = [...obj[item.id].minutes, ...tmp];
        }
    });
});
let counter = [];
for (const key in obj) {
    counter.push({
        id: key,
        counter: obj[key].counter,
        minutes: obj[key].minutes
    });
}

counter = counter.sort((a, b) => {
    return b.counter - a.counter;
});
console.log(counter[0].id);
counter.forEach((counter) => {
    const freq = {};
    counter.minutes.forEach((m) => {
        if (check(freq[m])) {
            freq[m] = 1;
        } else {
            freq[m] += 1;
        }
    });
    let n = { id: undefined, freq: 0 };
    for (const key in freq) {
        if (freq[key] > n.freq) {
            n.id = Number(key);
            n.freq = freq[key];
        }
    }
    counter['freq'] = n;
});
const sort = counter.sort((a,b)=> {
    return b.freq.freq - a.freq.freq;
})
console.log(Number(sort[0].id) * sort[0].freq.id);
//console.log(n.id * Number(counter[0].id));
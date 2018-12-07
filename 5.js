const { i5 } = require('./inputs');
//const input = 'dabAcCaCBAcCcaDA';
const input = i5;

const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const obj = {};
abc.forEach((letter) => {
    const split = input.replace(new RegExp(letter, 'g'), '').replace(new RegExp(letter.toUpperCase(), 'g'), '').split('');
    index = 0;
    while (index < (split.length - 1)) {
        if (split[index] !== split[index + 1] && split[index].toLowerCase() === split[index + 1].toLowerCase()) {
            split.splice(index, 2);
            index = 0;
        } else {
            index++;
        }
    }
    obj[letter] = split.length;
});
console.log(obj);
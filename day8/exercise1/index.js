const { input, helpers } = require('../../common/set-up-workplace');

let acc = 0;
let currentIndex = 0;
const visitedIndices = [];

do {
    visitedIndices.push(currentIndex);
    const [ op, value ] = input[currentIndex].split(' ');
    if (op === 'jmp') {
        currentIndex += parseInt(value);
        continue;
    } else if (op === 'acc') {
        acc += parseInt(value);
    }
    currentIndex++;
} while (!visitedIndices.includes(currentIndex));
console.log(acc);
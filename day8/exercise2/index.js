const { input, helpers } = require('../../common/set-up-workplace');

const variations = input.reduce((acc, cur, index, source) => {
    const [ op, value ] = cur;
    if (op === 'acc') {
        return acc;
    }
    const variation = [ ...source ];
    variation[index] = `${ op === 'nop' ? 'jmp' : 'nop' } ${value}`;
    return [ ...acc, variation ];
}, []);

let acc = 0;
variations.some((inputVariation) => {
    acc = 0;
    let currentIndex = 0;
    const visitedIndices = [];
    while (!(visitedIndices.includes(currentIndex) || currentIndex >= inputVariation.length)) {
        visitedIndices.push(currentIndex);
        const [ op, value ] = inputVariation[currentIndex].split(' ');
        if (op === 'jmp') {
            currentIndex += parseInt(value);
            continue;
        } else if (op === 'acc') {
            acc += parseInt(value);
        }
        currentIndex++;
    }
    return currentIndex >= inputVariation.length;
});
console.log(acc);
const { inputs } = require('./input.json');

const targets = [];

let solved = false;
const target = 2020;

for (let index = 0; !solved && index <= inputs.length; index++) {
    const currentValue = inputs[index];
    if (targets.find(t => t === currentValue)) {
        solved = true;
        console.log(currentValue, target - currentValue, (target - currentValue) * currentValue);
    } else {
        const targetMinusValue = target - currentValue;
        targets.push(targetMinusValue);
    }
}


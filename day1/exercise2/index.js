const { inputs } = require('./input.json');

const targets = [];

let solved = false;
const target = 2020;
for (let index = 0; !solved && index <= inputs.length; index++) {
    const valueA = inputs[index];
    const valueBplusCTarget = target - valueA;
    const valueBtargets = [];
    inputs.forEach(valueC => {
        valueBtargets.push(valueBplusCTarget - valueC);
        if (valueBtargets.find(valueB => valueC === valueB)) {
            const valueB = 2020 - (valueA + valueC);
            console.log(valueA, valueB, valueC, valueA * valueB * valueC);
        }
    });
}


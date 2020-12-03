const { inputs } = require('./input.json');

console.log(inputs.reduce((acc, cur) =>{
    const [ range, letterCondition, password ] = cur.split(' ');
    const [ min, max ] = range.split('-').map(val => parseInt(val));
    const [ letter ] = letterCondition.split(':');
    const letterCount = password.split('').filter(x => x === letter).length;
    return letterCount >= min && letterCount <= max
        ? acc + 1
        : acc;
} , 0));
const { inputs } = require('./input.json');

console.log(inputs.reduce((acc, cur) =>{
    const [ range, letterCondition, password ] = cur.split(' ');
    const [ index1, index2 ] = range.split('-').map(val => parseInt(val) - 1);
    const [ letter ] = letterCondition.split(':');
    const index1IsLetter = password[index1] === letter;
    const index2IsLetter = password[index2] === letter;
    return (index1IsLetter || index2IsLetter) && !(index1IsLetter && index2IsLetter)
        ? acc + 1
        : acc;
} , 0));
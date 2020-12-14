const { validateLogic } = require('../../common/set-up-workplace');

const main = input => {
    let mask;
    let mem = {};
    input.forEach(line => {
        const [ variable, value ] = line.split(' = ');
        if (variable === 'mask') {
            mask = value;
            return;
        }
        const address = variable.slice(4, -1);
        const binaryValue = parseInt(value).toString(2).padStart(36, '0');
        let maskedValue = binaryValue
            .split('')
            .map((unmaskedValue, index) => mask[index] === 'X' ? unmaskedValue : mask[index])
            .join('');
        mem[address] = parseInt(maskedValue, 2);
    })
    return Object.values(mem).reduce((acc, cur) => acc + cur, 0);
}

validateLogic(main, 165);
const { validateLogic, input } = require('../../common/set-up-workplace');

const main = input => {
    let mask;
    let mem = {};
    const applyMaskAtIndex = (address, index, value) => {
        if (index === 36) {
            mem[address] = value;
            return;
        }
        let maskedAddress = address.split('');
        switch (mask[index]) {
            case '0':
                applyMaskAtIndex(address, index + 1, value);
                break;
            case '1':
                maskedAddress[index] = '1';
                applyMaskAtIndex(maskedAddress.join(''), index + 1, value);
                break;
            case 'X':
                maskedAddress[index] = '0';
                applyMaskAtIndex(maskedAddress.join(''), index + 1, value);
                maskedAddress[index] = '1';
                applyMaskAtIndex(maskedAddress.join(''), index + 1, value);
                break;
        }
    }
    input.forEach((line, index) => {
        const [ variable, value ] = line.split(' = ');
        if (variable === 'mask') {
            mask = value;
            return;
        }
        const address = variable.slice(4, -1);
        const binaryAddress = parseInt(address).toString(2).padStart(36, '0');
        applyMaskAtIndex(binaryAddress, 0, parseInt(value));
    })
    return Object.values(mem).reduce((acc, cur) => acc + cur, 0);
}

console.log(main(input));

// validateLogic(main, 208);
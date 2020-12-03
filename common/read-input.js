const fs = require('fs');

const readInput = () => {
    var data = fs.readFileSync('./../input.txt', 'utf8');
    const result = data.split('\n');
    return result;
};


module.exports = readInput();
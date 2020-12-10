const fs = require('fs');

const readInput = () => {
    var data = fs.readFileSync('./../input.txt', 'utf8');
    const result = data.split('\n');
    return result.slice(0, -1);
};

const readTestInput = () => {
    try {
        var data = fs.readFileSync('./../test.txt', 'utf8');
        const result = data.split('\n');
        return result.slice(0, -1);
    } catch {
        return [];
    }
};

module.exports = {
    input: readInput(),
    test: readTestInput()
}

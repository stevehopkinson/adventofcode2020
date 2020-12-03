const input = require('../../common/read-input');

const slopeRight = 3;

let currentPosition = 0;
let treeCount = 0;

input.forEach((line) => {
    if (line[currentPosition] === '#') {
        treeCount++;
    }
    currentPosition = (currentPosition + slopeRight) % line.length;
});
console.log(treeCount);
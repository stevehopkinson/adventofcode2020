const input = require('../../common/read-input');

const slopes = [
    { right: 1, down: 1, count: 0 },
    { right: 3, down: 1, count: 0 },
    { right: 5, down: 1, count: 0 },
    { right: 7, down: 1, count: 0 },
    { right: 1, down: 2, count: 0 },
];

const TREE = '#';

input.forEach((line, lineIndex) => {
    console.log(`line ${lineIndex}:`);
    console.log(line);
    slopes.forEach(slope => {
        console.log(slope);
        if (lineIndex % slope.down !== 0) {
            console.log(line);
            console.log('no tree (skip line)');
            return;
        }
        const horizontalPosition = (slope.right * (lineIndex / slope.down))  % line.length;
        console.log(line.slice(0, horizontalPosition + 1) + '<' + line.slice(horizontalPosition + 2));
        if (line[horizontalPosition] === TREE) {
            console.log('tree!');
            slope.count++;
        } else {
            console.log('not tree');
        }
    });
});
console.log(slopes);
console.log(slopes.reduce((acc, cur) => acc * cur.count, 1))
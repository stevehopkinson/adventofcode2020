const { input } = require('../../common/set-up-workplace');

const trie = {};
const pathsFromValueMap = {};

const countPathsFromValue = value => {
    if (pathsFromValueMap[value]) {
        callsSaved++;
        return pathsFromValueMap[value];
    }
    const nextValues = trie[value];
    if (nextValues.length === 0){
        return 1;
    }
    const pathsFromValue = nextValues.reduce((acc, cur) => acc + countPathsFromValue(cur), 0);
    pathsFromValueMap[value] = pathsFromValue;
    return pathsFromValue;
}

[ 0, ...input ].map(val => parseInt(val)).forEach((value, index, array) => {
    const node = [];
    for (let i = 1; i <= 3; i++) {
        if (array.includes(value + i)) {
            node.push(value + i)
        }
    }
    trie[value] = node;
});
console.log('total combinations', countPathsFromValue(0));
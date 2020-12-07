const { input, helpers } = require('../../common/set-up-workplace');

const bagContainsGraph = {};

input.forEach(line => {
    const [ bagNameAdjective, bagNameColour, , , ...rest ] = line.split(' ');
    const bagName = `${bagNameAdjective} ${bagNameColour}`;
    if (rest.join(' ') === 'no other bags.') {
        bagContainsGraph[bagName] = {};
        return;
    }
    const containedBags = {};
    for (let i = 0; i < rest.length; i += 4) {
        const [ count, innerBagNameAdjective, innerBagNameColour ] = rest.slice(i, i + 4);
        const innerBagName = `${innerBagNameAdjective} ${innerBagNameColour}`;
        containedBags[innerBagName] = parseInt(count);
    }
    bagContainsGraph[bagName] = containedBags;
    return;
});

let count = 0;

const countContainedBags = (parentBagName, parentBagCount) => {
    const bagNode = bagContainsGraph[parentBagName];
    const containedBags = Object.entries(bagNode);
    if (!containedBags.length) {
        return;
    }
    containedBags.forEach(([childBagName, individualBagCount]) => {
        const netBagCount = individualBagCount * parentBagCount;
        count += netBagCount;
        countContainedBags(childBagName, netBagCount);
    });
}

countContainedBags('shiny gold', 1);
console.log(count);
const { input, helpers } = require('../../common/set-up-workplace');

const bagContainsGraph = {};
const bagIsContainedInGraph = {};

input.forEach(line => {
    const [ bagNameAdjective, bagNameColour, , , ...rest ] = line.split(' ');
    const bagName = `${bagNameAdjective} ${bagNameColour}`;
    if (rest.join(' ') === 'no other bags') {
        bagContainsGraph[bagName] = {};
        return;
    }
    const containedBags = {};
    for (let i = 0; i < rest.length; i += 4) {
        const [ count, innerBagNameAdjective, innerBagNameColour ] = rest.slice(i, i + 4);
        const innerBagName = `${innerBagNameAdjective} ${innerBagNameColour}`;
        containedBags[innerBagName] = parseInt(count);
        if (!bagIsContainedInGraph[innerBagName]) {
            bagIsContainedInGraph[innerBagName] = {};
        }
        bagIsContainedInGraph[innerBagName][bagName] = parseInt(count);
    }
    bagContainsGraph[bagName] = containedBags;
    return;
});

let allBagsChecked = [];
const bagsLeftToCheck = [];
let nextBag = 'shiny gold';
do {
    console.log('checking', nextBag);
    const node = bagIsContainedInGraph[nextBag];
    if (!node) {
        nextBag = bagsLeftToCheck.pop();
        continue;
    }
    const bagsContainedIn = Object.keys(node);
    console.log(nextBag, 'is contained in ', bagsContainedIn);
    bagsContainedIn.forEach(bag => {
        if (!allBagsChecked.includes(bag)) {
            allBagsChecked.push(bag);
            bagsLeftToCheck.push(bag);
        }
    })
    nextBag = bagsLeftToCheck.pop();
} while (nextBag);

console.log(allBagsChecked.length);
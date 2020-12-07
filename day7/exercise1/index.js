const { input, helpers } = require('../../common/set-up-workplace');

const bagIsContainedInGraph = {};

input.forEach(line => {
    const [ bagNameAdjective, bagNameColour, , , ...rest ] = line.split(' ');
    const bagName = `${bagNameAdjective} ${bagNameColour}`;
    if (rest.join(' ') === 'no other bags') {
        return;
    }
    for (let i = 0; i < rest.length; i += 4) {
        const [ count, innerBagNameAdjective, innerBagNameColour ] = rest.slice(i, i + 4);
        const innerBagName = `${innerBagNameAdjective} ${innerBagNameColour}`;
        if (!bagIsContainedInGraph[innerBagName]) {
            bagIsContainedInGraph[innerBagName] = {};
        }
        bagIsContainedInGraph[innerBagName][bagName] = parseInt(count);
    }
});

let allBagsChecked = [];
const bagsLeftToCheck = [];
let nextBag = 'shiny gold';
do {
    const node = bagIsContainedInGraph[nextBag];
    if (node) {
        const bagsContainedIn = Object.keys(node);
        bagsContainedIn.forEach(bag => {
            if (!allBagsChecked.includes(bag)) {
                allBagsChecked.push(bag);
                bagsLeftToCheck.push(bag);
            }
        })
    }
    nextBag = bagsLeftToCheck.pop();
} while (nextBag);

console.log(allBagsChecked.length);

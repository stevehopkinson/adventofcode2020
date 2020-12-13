const { validateLogic } = require('../../common/set-up-workplace');
const testExpectedResult = 1068781;
const main = (input) => {
    const buses = input[1]
        .split(',')
        .map((bus, index) => ({ id: parseInt(bus), offset: index }))
        .filter(bus => !isNaN(bus.id))
        .sort((busA, busB) => busB.id - busA.id);
    const busWithLargestId = buses[0];
    let timestampFound = false;
    let currentTime = -busWithLargestId.offset;
    while (!timestampFound) {
        currentTime += busWithLargestId.id;
        timestampFound = buses.every(bus =>
            (currentTime + bus.offset) % bus.id === 0
        );
    }
    return currentTime;
}

validateLogic(main, testExpectedResult);

const { validateLogic } = require('../../common/set-up-workplace');

const main = (input) => {
    const [ timeString, busLine ] = input;
    const time = parseInt(timeString);
    const buses = busLine.split(',').filter(bus => bus !== 'x').map(bus => parseInt(bus));
    let smallestWait = Infinity;
    let smallestWaitBusId;
    buses.forEach(id => {
        const wait = (Math.ceil(time / id) * id) - time;
        if (wait < smallestWait) {
            smallestWait = wait;
            smallestWaitBusId = id;
        }
    });
    return smallestWaitBusId * smallestWait;
}

validateLogic(main, 295);

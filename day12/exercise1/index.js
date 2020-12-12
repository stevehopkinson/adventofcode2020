const { helpers, validateLogic } = require('../../common/set-up-workplace');

const main = input => {
    const position = {
        NS: 0,
        WE: 0
    };
    let currentDirection = 'E';
    const directions = [ 'N', 'E', 'S', 'W' ];
    const directionPositionMap = {
        N: { axis: 'NS', multiplier:  1 },
        S: { axis: 'NS', multiplier: -1 },
        E: { axis: 'WE', multiplier:  1 },
        W: { axis: 'WE', multiplier: -1 }
    }
    const mod = (n, m) => {
        return ((n % m) + m) % m;
    }
    const updateDirection = (direction, degrees) => {
        const multiplier = direction === 'L' ? -1 : 1;
        const quarterCircles = degrees / 90;
        const currentIndex = directions.indexOf(currentDirection);
        const newIndex = mod(currentIndex + (quarterCircles * multiplier), directions.length);
        currentDirection = directions[newIndex];
    };
    const updatePosition = (direction, distance) => {
        const { axis, multiplier } = directionPositionMap[direction];
        position[axis] += distance * multiplier;
    }

    input.forEach(line => {
        const [ operation, value ] = helpers.splitStringAtIndex(line, 1);
        if (operation === 'F') {
            updatePosition(currentDirection, value);
        } else if (directions.includes(operation)) {
            updatePosition(operation, value);
        } else if (['L', 'R'].includes(operation)) {
            updateDirection(operation, value);
        }
    });

    return Math.abs(position.NS) + Math.abs(position.WE);
}

validateLogic(main, 25);

const { helpers, validateLogic } = require('../../common/set-up-workplace');

const main = input => {
    const shipPosition = {
        NS: 0,
        WE: 0
    };
    let waypointPosition = {
        NS: 1,
        WE: 10
    };
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
    const rotateWaypointAroundShip = (direction, degrees) => {
        const normalisedDegrees = direction === 'R' ? degrees : -degrees;
        const quarterCircles = mod(normalisedDegrees / 90, 4);
        for (let i = 0; i < quarterCircles; i++) {
            waypointPosition = {
                NS: -waypointPosition.WE,
                WE: waypointPosition.NS
            }
        }
    };
    const updateWaypointPosition = (direction, distance) => {
        const { axis, multiplier } = directionPositionMap[direction];
        waypointPosition[axis] += distance * multiplier;
    }
    const moveShipToWaypoint = (value) => {
        shipPosition.NS += waypointPosition.NS * value;
        shipPosition.WE += waypointPosition.WE * value;
    }
    input.forEach(line => {
        const [ operation, value ] = helpers.splitStringAtIndex(line, 1);
        if (operation === 'F') {
            moveShipToWaypoint(value);
        } else if (directions.includes(operation)) {
            updateWaypointPosition(operation, value);
        } else if (['L', 'R'].includes(operation)) {
            rotateWaypointAroundShip(operation, value);
        }
    });

    return Math.abs(shipPosition.NS) + Math.abs(shipPosition.WE);
}

validateLogic(main, 286);

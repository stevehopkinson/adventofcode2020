
const { input, test } = require('../../common/set-up-workplace');

const EMPTY_SEAT = 'L';
const OCCUPIED_SEAT = '#';
const FLOOR = '.';
const visibilityVectors = [
    { x: -1, y: -1 },
    { x:  0, y: -1 },
    { x:  1, y: -1 },
    { x: -1, y:  0 },
    { x:  1, y:  0 },
    { x: -1, y:  1 },
    { x:  0, y:  1 },
    { x:  1, y:  1 },
];

const coordinateIsValid = (x, y, grid) => {
    return x >= 0 && y >= 0 && x < grid[0].length && y < grid.length;
}

const occupiedSeatIsVisibleOnVector = ({ x, y }, xIndex, yIndex, grid) => {
    let currentX = xIndex + x;
    let currentY = yIndex + y;
    let visibleSeat;
    while (coordinateIsValid(currentX, currentY, grid) && !visibleSeat) {
        if (grid[currentY][currentX] !== FLOOR) {
            visibleSeat = grid[currentY][currentX];
        }
        currentX += x;
        currentY += y;
    }
    return visibleSeat === OCCUPIED_SEAT;
}


const getNewValue = (xIndex, yIndex, grid) => {
    const value = grid[yIndex][xIndex];
    let newValue = value;
    const visibleOccupiedSeats = visibilityVectors
        .filter((vector) => occupiedSeatIsVisibleOnVector(vector, xIndex, yIndex, grid))
        .length;
    if (value === EMPTY_SEAT && visibleOccupiedSeats === 0) {
        newValue = OCCUPIED_SEAT;
    } else if (value === OCCUPIED_SEAT && visibleOccupiedSeats >= 5) {
        newValue = EMPTY_SEAT
    }
    return newValue;
}

const countOccupiedSeats = grid => grid.reduce((acc, cur) => acc + cur.filter(cell => cell === OCCUPIED_SEAT).length, 0);

const main = (input) => {
    let grid = input.map(line => line.split(''));
    let gridStayedSame = false;
    while (!gridStayedSame) {
        let gridChanged = false;
        const newGrid = grid.map((line, yIndex) => 
            line.map((cellValue, xIndex) => {
                const newValue = getNewValue(xIndex, yIndex, grid);
                if (newValue !== cellValue) {
                    gridChanged = true;
                }
                return newValue;
            })
        )
        grid = newGrid;
        if (!gridChanged) {
            gridStayedSame = true;
        }
    }
    return countOccupiedSeats(grid);
}

const testResult = main(test);
console.log('Test result', testResult);
if (testResult === 26) {
    console.log('Test passed! Running main input...');
    console.log(main(input));
}
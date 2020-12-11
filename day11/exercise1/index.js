
const { input, helpers, test } = require('../../common/set-up-workplace');

const EMPTY_SEAT = 'L';
const OCCUPIED_SEAT = '#';
const FLOOR = '.';
const adjacents = [
    { x: -1, y: -1 },
    { x:  0, y: -1 },
    { x:  1, y: -1 },
    { x: -1, y:  0 },
    { x:  1, y:  0 },
    { x: -1, y:  1 },
    { x:  0, y:  1 },
    { x:  1, y:  1 },
];


const getNewValue = (xIndex, yIndex, grid) => {
    const value = grid[yIndex][xIndex];
    let newValue = value;
    const occupiedAdjacentCells = adjacents
        .map(({ x, y }) => grid[yIndex + y] && grid[yIndex + y][xIndex + x] || FLOOR)
        .filter(adjacentValue => adjacentValue === OCCUPIED_SEAT)
        .length;
    if (value === EMPTY_SEAT && occupiedAdjacentCells === 0) {
        newValue = OCCUPIED_SEAT;
    } else if (value === OCCUPIED_SEAT && occupiedAdjacentCells >= 4) {
        newValue = EMPTY_SEAT
    }
    return newValue;
}

const countOccupiedSeats = grid => grid.reduce((acc, cur) => acc + cur.filter(cell => cell === OCCUPIED_SEAT).length, 0);

const main = (input) => {
    let grid = input.map(line => line.split(''));
    let gridStayedSame = false;
    let cycleCount = 0;
    while (!gridStayedSame) {
        cycleCount++;
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

if (main(test) === 37) {
    console.log('Test passed! Running main input...');
    console.log(main(input));
}
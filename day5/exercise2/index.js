const { input, helpers } = require('../../common/set-up-workplace');

const MIN_ROW = 0;
const MAX_ROW = 127;
const MIN_COL = 0;
const MAX_COL = 7;

const evaluateBinaryPartition = (codeArray, takeLowerChar, takeUpperChar, minVal, maxVal) => {
    const nextInstruction = codeArray.shift();
    const takeLower = nextInstruction === takeLowerChar;
    const numValuesRemaining = (maxVal - minVal) + 1;
    if (numValuesRemaining === 2) {
        return takeLower
            ? minVal
            : maxVal;
    }
    if (takeLower) {
        maxVal -= numValuesRemaining / 2;
    } else {
        minVal += numValuesRemaining / 2;
    }
    return evaluateBinaryPartition(codeArray, takeLowerChar, takeUpperChar, minVal, maxVal);
}

const getRowNumber = (rowCodeArray) => {
    return evaluateBinaryPartition(rowCodeArray, 'F', 'B', MIN_ROW, MAX_ROW);
};

const getColNumber = (colCodeArray) => {
    return evaluateBinaryPartition(colCodeArray, 'L', 'R', MIN_COL, MAX_COL);
}

const getSeatID = (rowNumber, colNumber) => {
    return rowNumber * 8 + colNumber;
}

const maxPossibleSeatID = getSeatID(MAX_ROW, MAX_COL);
const missingSeatIDs = new Set(Array.from(Array(maxPossibleSeatID).keys()));
let highestSeatID = -Infinity;
let lowestSeatID = Infinity;
input.forEach(seatCode => {
    const [ rowCode, colCode ] = helpers.splitStringAtIndex(seatCode, 7).map(helpers.stringToCharArray)
    const rowNumber = getRowNumber(rowCode);
    const colNumber = getColNumber(colCode);
    const seatID = getSeatID(rowNumber, colNumber);
    missingSeatIDs.delete(seatID);
    if (seatID > highestSeatID) {
        highestSeatID = seatID;
    }
    if (seatID < lowestSeatID) {
        lowestSeatID = seatID;
    }
});

const remainingSeats = [...missingSeatIDs].filter(missingSeatID =>
    missingSeatID > lowestSeatID &&
    missingSeatID < highestSeatID
);

const yourSeat = remainingSeats[0];

console.log(yourSeat);

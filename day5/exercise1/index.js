const input = require('../../common/read-input');

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

let highestSeatID = 0;

input.forEach(seatCode => {
    const rowCode = seatCode.slice(0, 7).split('');
    const colCode = seatCode.slice(7).split('');
    const rowNumber = getRowNumber(rowCode);
    const colNumber = getColNumber(colCode);
    const seatID = rowNumber * 8 + colNumber;
    if (seatID > highestSeatID) {
        highestSeatID = seatID;
    }
});

console.log(highestSeatID);


const { validateLogic } = require('../../common/set-up-workplace');

const main = (input) => {
    const numbersToLastTurnForNumberMap = {};
    const startingNumbers = input[0].split(',');
    let prevNumber; // number on turn - 1
    for (let turn = 1; turn <= 30000000; turn++) {
        let currentNumber;
        if (startingNumbers[turn - 1]) {
            currentNumber = parseInt(startingNumbers[turn - 1]);
        } else {
            const lastTurnForPrevNumber = numbersToLastTurnForNumberMap[prevNumber];
            currentNumber = lastTurnForPrevNumber
                ? (turn - lastTurnForPrevNumber - 1)
                : 0;
        }
        numbersToLastTurnForNumberMap[prevNumber] = turn - 1;
        prevNumber = currentNumber;
    }
    return prevNumber;
}

validateLogic(main, 175594);
const { input } = require('../../common/set-up-workplace');

const target = 373803594;
input.map(str => parseInt(str)).some((value, startIndex, array) => {
    let currentIndex = startIndex;
    let acc = value;
    let smallestValue = value;
    let largestValue = value;
    while (acc < target) {
        currentIndex++;
        acc += array[currentIndex];
        if (array[currentIndex] > largestValue){
            largestValue = array[currentIndex];
        } else if (array[currentIndex] < smallestValue) {
            smallestValue = array[currentIndex];
        }
    }
    if (acc === target) {
        console.log(smallestValue + largestValue);
        return true;
    }
});

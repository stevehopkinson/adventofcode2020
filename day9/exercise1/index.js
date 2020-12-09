const { input$, helpers } = require('../../common/set-up-workplace');
const { map, filter, bufferCount, first } = require('rxjs/operators');

const groupSize = 25;

input$.pipe(
    map(val => parseInt(val)),
    bufferCount(3, 1),
    filter((group) => {
        const [ currentNumber, ...otherNumbers ] = group.slice().reverse();
        const possibleValues = helpers.getPairsFromArray(otherNumbers).map(([a, b]) => a + b);
        return !possibleValues.includes(currentNumber);
    }),
    map(group => group[groupSize]),
    first()
).subscribe(answer => console.log(answer));

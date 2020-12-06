const { input, helpers } = require('../../common/set-up-workplace');

const groups = helpers.splitInputByEmptyLines(input);

const countSharedAnswers = group => group.reduce(
    (acc, cur) => acc.filter(answer => helpers.stringToCharArray(cur).includes(answer)),
    helpers.stringToCharArray(group[0])
).length;

const sumOfGroupSharedAnswers = groups.reduce((acc, cur) => acc + countSharedAnswers(cur), 0);

console.log(sumOfGroupSharedAnswers);
const { input, helpers } = require('../../common/set-up-workplace');

const groups = helpers.splitInputByEmptyLines(input);

const countCombinedAnswers = group => [...new Set(group.reduce((acc, cur) => [...acc, ...helpers.stringToCharArray(cur)], []))].length;

const sumOfGroupCombinedAnswers = groups.reduce((acc, cur) => acc + countCombinedAnswers(cur), 0);

console.log(sumOfGroupCombinedAnswers);
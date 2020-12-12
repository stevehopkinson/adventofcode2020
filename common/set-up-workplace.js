const rxjs = require('rxjs');
const { input, test } = require('./read-input');
const helpers = require('./helper-functions');

module.exports = {
    helpers,
    input,
    input$: rxjs.from(input),
    test,
    test$: rxjs.from(test),
    validateLogic: (func, expectedTestResult) => func(test) === expectedTestResult
        ? console.log('test passed, actual result is:', func(input))
        : console.log('test failed. expected', expectedTestResult, 'received', func(test))
};

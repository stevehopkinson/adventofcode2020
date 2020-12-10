const rxjs = require('rxjs');
const { input, test } = require('./read-input');
const helpers = require('./helper-functions');

module.exports = {
    helpers,
    input,
    input$: rxjs.from(input),
    test,
    test$: rxjs.from(test)
};

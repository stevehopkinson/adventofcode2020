const rxjs = require('rxjs');
const input = require('./read-input');
const helpers = require('./helper-functions');

module.exports = {
    helpers,
    input,
    input$: rxjs.from(input)
};

const input = require('../../common/read-input');

const passportStrings = input.reduce((acc, curLine) => {
    if (curLine.length === 0) {
        return [ ...acc, ''];
    }
    const lastElement = acc.pop();
    return [ ...acc, `${lastElement} ${curLine}`.trim()];
}, ['']);

const passportObjects = passportStrings.map(passportString =>
    passportString
        .split(' ')
        .map(keyValue => keyValue.split(':'))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
);

const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
];

const validPassportObjects = passportObjects.filter(passportObject => {
    const passportKeys = Object.keys(passportObject);
    return requiredFields.every(requiredField =>
        passportKeys.includes(requiredField)
    );
});

console.log(validPassportObjects.length);
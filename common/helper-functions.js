module.exports = {
    splitStringAtIndex: (string, index) => [ string.slice(0, index), string.slice(index) ],
    stringToCharArray: string => string.split(''),
    splitInputByEmptyLines: (stringArray) => stringArray.reduce(
        (acc, cur) => cur === ''
            ? [ ...acc, [] ]
            : [ ...acc.slice(0, -1), [ ...acc[acc.length - 1], cur ] ]
        , [[]]
    )
}

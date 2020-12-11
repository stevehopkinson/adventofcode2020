module.exports = {
    splitStringAtIndex: (string, index) => [ string.slice(0, index), string.slice(index) ],
    stringToCharArray: string => string.split(''),
    splitInputByEmptyLines: (stringArray) => stringArray.reduce(
        (acc, cur) => cur === ''
            ? [ ...acc, [] ]
            : [ ...acc.slice(0, -1), [ ...acc[acc.length - 1], cur ] ]
        , [[]]
    ),
    getPairsFromArray: (array) => {
        const pairs = []
        for (var i = 0; i < array.length - 1; i++) {
            for (var j = i; j < array.length - 1; j++) {
                pairs.push([array[i], array[j+1]]);
            }
        }
        return pairs;
    },
}

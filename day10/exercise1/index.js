const { input$ } = require('../../common/set-up-workplace');
const { combineLatest } = require('rxjs');
const { count, map, toArray, mergeMap, pairwise, filter, partition, startWith, endWith } = require('rxjs/operators');


const [ ones, threes ] = input$.pipe(
    startWith(0),
    map(x => parseInt(x)),
    toArray(),
    mergeMap(array => array.sort((a, b) => a - b)),
    pairwise(),
    map(([ a, b ]) => b - a),
    endWith(3),
    filter(gap => gap !== 2),
    partition(gap => gap === 1)
);

combineLatest(
    ones.pipe(count()),
    threes.pipe(count())
).subscribe(([ onesCount, threesCount ]) => console.log(onesCount * threesCount));

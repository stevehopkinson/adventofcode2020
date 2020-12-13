const { validateLogic } = require('../../common/set-up-workplace');
const testExpectedResult = BigInt(1068781);

function modInverse(a, m) {
    // validate inputs
    [a, m] = [Number(a), Number(m)]
    if (Number.isNaN(a) || Number.isNaN(m)) {
      return NaN // invalid input
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
      return NaN // invalid input
    }
    // find the gcd
    const s = []
    let b = m
    while(b) {
      [a, b] = [b, a % b]
      s.push({a, b})
    }
    if (a !== 1) {
      return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for(let i = s.length - 2; i >= 0; --i) {
      [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}

const main = (input) => {
    const num = [];
    const rem = [];
    input[1]
        .split(',')
        .forEach((n, index) => {
            if (n === 'x') {
                return;
            }
            num.push(BigInt(n));
            rem.push((BigInt(n) - BigInt(index)) % BigInt(n));
        }
    );
    const prod = num.reduce((acc, cur) => acc * cur, BigInt(1));
    const pp = [];
    num.forEach(num => pp.push(prod / num));
    let result = BigInt(0);
    num.forEach((num, i) => {
        result += rem[i] * BigInt(modInverse(pp[i], num)) * pp[i];
    });
    return result % prod;
}

validateLogic(main, testExpectedResult);

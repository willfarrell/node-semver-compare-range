# semver compare

[![Build Status](https://travis-ci.org/willfarrell/node-semver-compare-range.svg?branch=master)](https://travis-ci.org/willfarrell/node-semver-compare-range)
[![Dependency Status](https://gemnasium.com/willfarrell/node-semver-compare-range.svg)](https://gemnasium.com/willfarrell/node-semver-compare-range)
[![Coverage Status](https://coveralls.io/repos/github/willfarrell/node-semver-compare-range/badge.svg?branch=master)](https://coveralls.io/github/willfarrell/node-semver-compare-range?branch=master)

[![NPM](https://nodei.co/npm/semver-compare-range.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/semver-compare-range/)

Compare two semver version or version range strings, returning -1,0,1. To be used by passing into `[].sort()`. Developed to order versioned sql files to ensure proper order of execution.

## Example
```javascript
var cmp = require('semver-compare-all');
var versions = [
    '1.0.0',
    '0.0.1 - 0.0.9',
    '1.1.0 - 1.1.0',
    '0.0.0 - 0.0.1',
    '0.0.0',
    '0.0.9 - 1.0.0',
];
console.log(versions.sort(cmp).join('\n'));
```

### Example Return
```
0.0.0
0.0.0 - 0.0.1
0.0.1 - 0.0.9
0.0.9 - 1.0.0
1.0.0
1.0.0 - 1.1.0

```

## Methods
`var cmp = require('semver-compare-range');`

### cmp(a,b)
- `*` or `(empty string)` will return `-1`.
- Invalid version will return `0`.
- `a < b` return `-1`; `a == b` return `0`; `a > b` return `1`.
- When `a` is not a version range and `b` is a version range: `a <= min(b)` return `-1`; `a > min(b)` return `1`.
- When `a` and `b` are version ranges: `min(a) < min(b)` return `-1`; `min(a) > min(b)` return `1`; `min(a) == min(b) && max(a) < max(b)` return `-1`;  `min(a) == min(b) && max(a) > max(b)` return `1`; `a == b` return `0`.

## Install
`npm install semver-compare-range`

## License
MIT
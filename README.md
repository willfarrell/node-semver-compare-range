# semver compare 
Compare two semver version or version range strings, returning -1,0,1. To be used by passing into `[].sort()`. Developed to order versioned sql files to ensure proper order of execution.

## Example
```javascript
var cmp = require('semver-compare-all');
var versions = [
    '1.2.3'
];
console.log(versions.sort(cmp).join('\n'));
```

### Example Return
```
1.2.3
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
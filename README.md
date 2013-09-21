


AT-AT
=====

An AT-AT walker to walk all over your (filesystem) planet.

## Usage

```javascript
var walker = require('at-at');

walker.walk('./', function(file) {
    console.log('FILE: '+file);
});
```

The callback passed to walker.walk() gets called once for every file in the
tree. The given example is similar to running the shell command `find`.

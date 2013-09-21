


AT-AT
=====

An AT-AT walker to walk all over your (filesystem) planet.

## Usage

```javascript
var walker = require('at-at');

walker.walk('./', function(files) {
    // files is an array of filenames (including the paths).
    files.forEach(function(file) {
        console.log(file);
    }
});
```

The callback passed to walker.walk() gets called after all files have been
traversed asynchronously. The given example is similar to running the shell
command `find`.

## Thanks to

- [mscdex](github.com/mscdex/) for some insight on asynchronicity.
- [chjj](github.com/chjj) for the initial
  [idea](http://stackoverflow.com/questions/5827612). I wanted to make my own
  and I learnt tons in the process.


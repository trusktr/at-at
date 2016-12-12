AT-AT
=====

An AT-AT walker to walk all over your (filesystem) planet.

## Usage

Use at-at to traverse directories in your filesystem.


```js
var walker = require('at-at');

walker.walk('./', function(files) {
    // files is an array of filenames (including the paths).
    files.forEach(function(file) {
        console.log(file);
    });
});
```

The callback passed to walker.walk() gets called after all files have been
traversed asynchronously. The given example is similar to running the shell
command `find`.

## TODO

 * Traverse with regex filters.
 * Traverse by type (directory, file, etc).

## Thanks to

- [mscdex](http://github.com/mscdex/) for some insight on asynchronicity.
- [chjj](http://github.com/chjj) for the initial
  [idea](http://stackoverflow.com/questions/5827612). I wanted to make my own
  and I learnt lots in the process.


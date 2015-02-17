

var fs = require('fs');
var parametric = require('parametric');
var callAfter = require('army-knife/callAfter').callAfter;

exports.walk = function() {
    return parametric.overload(arguments,
        [
            ["str", {}, function(){}],
            ["str", function(){}],
        ],

        [
            //TODO: filter the file list by regex. run callback after walking.
            function(path, filter, callback) {
            },

            // Run callback when done walking. No filter.
            function (path, callback) {
                var fileList = [];

                // append a slash to the path if it doesn't have one.
                if (! path.match(/\/$/)) {
                    path = path+'/';
                }

                fs.readdir(path, function(err, files) {
                    if (err) throw new Error('Unable to read '+path+'.\n'+err)
                    if (!files.length) callback(fileList); // return empty fileList.

                    callback = callAfter(files.length, callback);
                    files.forEach(function(file) {
                        var file = path + file;
                        fs.stat(file, function(err, stats) {
                            if (err) throw err;

                            fileList.push(file);
                            if (stats.isDirectory()) {
                                exports.walk(file, function(list) {
                                    fileList = fileList.concat(list);
                                    callback(fileList);
                                });
                            }
                            else { // is not a directory
                                callback(fileList);
                            }
                        });
                    });
                });

            }
        ]
    );

};

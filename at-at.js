

var fs = require('fs');
var parametric = require('parametric');

exports.walk = function() {
    return parametric.overload(arguments,
        [
            ["str", {}, function(){}],
            ["str", function(){}],
        ],

        [
            function(path, filter, callback) {
                //TODO: filter the file list by regex. run callback after walking.
            },
            function (path, callback) {
                // Run callback when done walking. No filter.
                var filelist = [];

                if (! path.match(/\/$/)) {
                    path = path+'/';
                }

                fs.readdir(path, function(err, files) {
                    if (err) throw new Error('Unable to read '+path+'.\n'+err)

                    var filesleft = files.length;

                    if (!filesleft) callback(filelist); // return empty filelist.

                    files.forEach(function(file) {
                        var file = path + file;
                        fs.stat(file, function(err, stats) {
                            filelist.push(file);
                            if (err) {
                                console.log('Error: '+err);
                            }
                            if (stats.isDirectory()) {
                                exports.walk(file, function(list) {
                                    filelist = filelist.concat(list);
                                    filesleft--;
                                    if (!filesleft) {
                                        callback(filelist);
                                    }
                                });
                            }
                            else { // is not a directory
                                filesleft--;
                                if (!filesleft) {
                                    callback(filelist);
                                }
                            }
                        });
                    });
                });

            }
        ]
    );

};

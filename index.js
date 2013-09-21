

var fs = require('fs');
var parametric = require('parametric');

exports.walk = function() {
    return parametric.overload(arguments,
        [
            ["str", {}, function(){}],
            ["str", {}],
            ["str", function(){}],
            ["str"]
        ],

        [
            function(path, filter, callback) {
                //TODO: filter the file list by regex. run callback on each filtered file.
            },
            function(path, filter) {
                //TODO: filter the file list by regex. no callback for the filtered files.
            },
            function(path, callback) {
                // Run callback on each file. No filter.
                if (! path.match(/\/$/)) {
                    path = path+'/';
                }

                fs.readdir(path, function(err, files) {
                    if (err) {
                        console.log('Error reading '+path+': '+err);
                        return false;
                    }

                    if (files.length) {
                        files.forEach(function(file) {
                            file = path+file;
                            //console.log('file: '+file);
                            callback(file);
                            fs.stat(file, function(err, stats) {
                                if (err) {
                                    console.log('Error: '+err);
                                    return false;
                                }
                                if (stats.isDirectory()) {
                                    exports.walk(file, callback);
                                    return true;
                                }
                            });
                        });
                        return true;
                    }
                    else {
                        console.log('No files in '+path+'.');
                        return false;
                    }
                });
            },
            function(path) {
                //TODO: return just the file list, but don't run callback on any files.
            }
        ]
    );

};

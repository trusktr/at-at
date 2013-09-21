

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
                console.log('--- path: '+path);

                fs.readdir(path, function(err, files) {
                    console.log('--- files 1: '+files+" "+files.length);
                    var filesleft = files.length;

                    if (err) {
                        console.log('Error reading '+path+': '+err);
                        return false;
                    }

                    if (!filesleft) {
                        console.log('No files in '+path+'.');
                        callback(filelist); // return empty filelist.
                    }
                    //files.forEach(function(file) {
                    for (var i=0; i<files.length; i++) {
                        (function() {
                            var file = path + files[i];
                            console.log('File: '+file);
                            fs.stat(file, function(err, stats) {
                                filelist.push(file);
                                if (err) {
                                    console.log('Error: '+err);
                                }
                                console.log('--- isDirectory: '+file+' '+stats.isDirectory()+' '+stats.mode);
                                if (stats.isDirectory()) {
                                    exports.walk(file, function(list) {
                                        console.log('## list: '+ list+" "+ list.length);
                                        console.log('## filelist: '+ filelist+" "+ filelist.length);
                                        filelist = filelist.concat(list);
                                        console.log('## filelist: '+ filelist+" "+ filelist.length);
                                        console.log(filesleft--);
                                        if (!filesleft) {
                                            console.log('+++ File count: '+ filelist.length);
                                            callback(filelist);
                                        }
                                    });
                                }
                                else { // is not a directory
                                    console.log(filesleft--);
                                    if (!filesleft) {
                                        console.log('--- File count: '+ filelist.length);
                                        callback(filelist);
                                    }
                                }
                            });
                        })();
                    }
                    //}
                });

            }
        ]
    );

};

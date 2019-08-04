var fs = require('fs')
var parametric = require('parametric')
var callAfter = require('army-knife/callAfter').callAfter
var Path = require('path')
var r = require('regexr').default

exports.walk = function() {
	return parametric.overload(
		arguments,

		// prettier-ignore
		[
			['str', {}, () => {}, {}],
			['str', () => {}, {}],
		],

		[
			//TODO: filter the file list by regex. run callback after walking.
			function(path, filter, callback, options) {},

			// Run callback when done walking. No filter.
			function(path, callback, options) {
				_traverse(path, files => {
					if (options && options.relative) {
						if (!path.endsWith(Path.sep)) {
							path = path + Path.sep
						}

						files = files.map(file => file.replace(r`/^${r.escape(path)}/`, ''))
					}

					callback(files)
				})
			},
		]
	)
}

function _traverse(path, callback) {
	var fileList = []

	// append a slash to the path if it doesn't have one.
	if (!path.endsWith(Path.sep)) {
		path = path + Path.sep
	}

	fs.readdir(path, function(err, files) {
		if (err) throw new Error('Unable to read ' + path + '.\n' + err)
		if (!files.length) callback(fileList) // return empty fileList.

		callback = callAfter(files.length, callback)

		files.forEach(function(fileName) {
			var file = path + fileName

			fs.stat(file, function(err, stats) {
				if (err) throw err

				fileList.push(file)

				if (stats.isDirectory()) {
					_traverse(file, function(list) {
						fileList = fileList.concat(list)
						callback(fileList)
					})
				} else {
					// is not a directory
					callback(fileList)
				}
			})
		})
	})
}

const fs = require('fs'),
	path = require('path'),
	glob = require('glob');

class SmallWatch {
	constructor(options={}) {
		let defaultOptions = {
			dir: '/',
			files: [],
			ignore: [],
			callback: (fileName) => {;}
		}
		this.options = {...defaultOptions, ...options};
		this.options.dir = path.resolve('.', this.options.dir);
	}

	apply(compiler) {

		this.options.files.forEach(item => {
			item = this.options.dir+'/'+this.options.files;
			
			glob(item, {ignore: this.options.ignore}, (er, files) => {

				files.forEach(file => {
					fs.watchFile(file, (curr, prev)=>{this.watchHandler(file)});
				})

			})
		})
		this.log('Small-Watch Plugin is started!');
	}

	watchHandler(fileName) {
		this.log(lastPathItem(fileName)+' has been changed...');
		this.options.callback(fileName)
	}

	log(mess) {
		console.log('[PhpWatchPlugin] '+mess)
	}
}

function lastPathItem(filePath) {
	let slashPosition = filePath.lastIndexOf('/')+1;
	return filePath.substring(slashPosition);
}

module.exports = SmallWatch;
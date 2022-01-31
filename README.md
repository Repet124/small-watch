# Small-Watch
Small-Watch is webpack plugin for files watching and executing provided callback. It will be useful, when other watch methods is not working. It use a function fs.watchFile.
## Get started
Run a command:

`npm i small-watch --save-dev`

Then init plugin, in plugins array, with your options.


    const smallWatch = require('small-watch');
    ...
    plugins: [
		...
		new smallWatch({
			//your options
		})
		...
	]
## Options
Fields of options object:
1. **dir** - directory of base catalog, default `.` *(string)*
2. **files** - files for watching default `[]` *(array)*
3. **ignore** - files for ignore, default `[]` *(array)*
4. **callback** - function, which will be called after file change. One argument - fileName, default `empty func` *(func)*
## Examples
### Usage with browser-sync-webpack-plugin

    
    ...
    plugins: [
	    ...
		new smallWatch({
			dir: 'resources',
			files: ['views/*.php'],
			callback: file => {
				const bs = require('browser-sync').get('bs-webpack-plugin');
				bs.reload();
			}
		}),
		new BrowserSyncPlugin(
			{
				host: 'localhost',
				port: 3000,
				proxy: 'http://localhost/'
			},
			{
				reload: true
			}
		)
		...
	]

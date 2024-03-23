#!/usr/bin/env node
import { resolve, parse } from 'path';
import { downloadByURL, downloadById } from './main.js';
import { extract } from './parser.js';
const help = `Usage: crx-util -u=url [-o=destination]
Usage: crx-util -i=extensionId -s=source [-o=destination]
Usage: crx-util -e=crxPath [-o=destination]

Download (and extract) Chrome/Edge extension.

Arguments:
  -u, --url      Chrome/Edge extension url
  -i, --id       Extension id
  -s, --source   Extension source, "chrome" or "edge"
  -e, --extract  Extract a local CRX file
  -o, --output   Destination, if it ends with ".crx", it will be saved as a CRX file, otherwise it will be extracted to "\${destination}/\${extensionId}". Default by "process.cwd()".
  -h, --help     Display help for command`;
const args = process.argv.splice(2);
if (args.includes('-h') || args.includes('--help')) {
    console.log(help);
}
else {
    const o = {};
    args.forEach((kv) => {
        const [k, v] = kv.split('=');
        o[k] = v;
    });
    const options = {
        url: o['-u'] || o['--url'],
        id: o['-i'] || o['--id'],
        source: o['-s'] || o['--source'],
        output: o['-o'] || o['--output'] || process.cwd(),
        crx: o['-e'] || o['--extract'],
    };
    // console.log(options);
    if (options.url) {
        downloadByURL(options.url, options.output);
    }
    else if (options.id && options.source) {
        downloadById(options.id, options.source, options.output);
    }
    else if (options.crx) {
        console.log('[CRX Util]');
        console.log('  extracting...');
        try {
            const output = resolve(options.output, parse(options.crx).name);
            extract(options.crx, output);
            console.log('  done!');
        }
        catch (err) {
            console.error('  extract failed');
            console.error(err);
        }
    }
    else {
        console.log(help);
    }
}
//# sourceMappingURL=cli.mjs.map
import { resolve } from 'path';
import { writeFileSync } from 'fs';
import * as downloader from './downloader.js';
import { extract } from './parser.js';
/**
 * Download a CRX file by url
 * @param {String} url Chrome/Edge extension url
 * @param {String} output If `output` ends with ".crx", it will be saved as a CRX file, otherwise it will be extracted to `${output}/${extensionId}`. Default by `process.cwd()`.
 * @return
 * @public
 */
export function downloadByURL(url, output = process.cwd()) {
    const { extensionId, source } = downloader.parseURL(url);
    return downloadById(extensionId, source, output);
}
export function downloadById(extensionId, source, output = process.cwd()) {
    if (source !== 'chrome' && source !== 'edge') {
        throw 'source must be "chrome" or "edge"';
    }
    const downloadURL = downloader.getDownloadURL(extensionId, source);
    const saveAsCRX = /\.crx$/i.test(output);
    output = saveAsCRX ? resolve(output) : resolve(output, extensionId);
    console.log('[CRX Util]');
    console.log('  id: ' + extensionId);
    console.log('  from: ' + downloadURL);
    console.log('  to: ' + output);
    console.log('  downloading...');
    return downloader
        .downloadById(extensionId, source)
        .then((buffer) => {
        if (saveAsCRX) {
            console.log('  saving...');
            writeFileSync(output, Buffer.from(buffer));
            console.log('  done!');
        }
        else {
            console.log('  extracting...');
            try {
                extract(Buffer.from(buffer), output);
                console.log('  done!');
            }
            catch (err) {
                console.error('  extract failed');
                console.error(err);
                return Promise.reject(err || 'extract failed');
            }
        }
        return { result: true, extensionId, source, downloadURL, output };
    })
        .catch((error) => {
        console.error('  ' + error);
        return { result: false, error, extensionId, source, downloadURL, output };
    });
}
//# sourceMappingURL=main.js.map
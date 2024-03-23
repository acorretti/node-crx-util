"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadById = exports.downloadByURL = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const downloader = __importStar(require("./downloader.js"));
const parser_js_1 = require("./parser.js");
/**
 * Download a CRX file by url
 * @param {String} url Chrome/Edge extension url
 * @param {String} output If `output` ends with ".crx", it will be saved as a CRX file, otherwise it will be extracted to `${output}/${extensionId}`. Default by `process.cwd()`.
 * @return
 * @public
 */
function downloadByURL(url, output = process.cwd()) {
    const { extensionId, source } = downloader.parseURL(url);
    return downloadById(extensionId, source, output);
}
exports.downloadByURL = downloadByURL;
function downloadById(extensionId, source, output = process.cwd()) {
    if (source !== 'chrome' && source !== 'edge') {
        throw 'source must be "chrome" or "edge"';
    }
    const downloadURL = downloader.getDownloadURL(extensionId, source);
    const saveAsCRX = /\.crx$/i.test(output);
    output = saveAsCRX ? (0, path_1.resolve)(output) : (0, path_1.resolve)(output, extensionId);
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
            (0, fs_1.writeFileSync)(output, Buffer.from(buffer));
            console.log('  done!');
        }
        else {
            console.log('  extracting...');
            try {
                (0, parser_js_1.extract)(Buffer.from(buffer), output);
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
exports.downloadById = downloadById;
//# sourceMappingURL=main.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = exports.getZipContents = exports.getCrxVersion = exports.isCrx = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const adm_zip_1 = __importDefault(require("adm-zip"));
function getBuffer(crxPathOrBuffer) {
    return typeof crxPathOrBuffer === 'string'
        ? (0, fs_1.readFileSync)(crxPathOrBuffer)
        : crxPathOrBuffer;
}
function isCrx(crxPathOrBuffer) {
    const buffer = getBuffer(crxPathOrBuffer);
    const magic = buffer.readUInt32BE(0);
    return magic === 0x43723234; // Cr24
}
exports.isCrx = isCrx;
function getCrxVersion(crxPathOrBuffer) {
    const buffer = getBuffer(crxPathOrBuffer);
    return buffer.readUInt32LE(4);
}
exports.getCrxVersion = getCrxVersion;
function getZipContents(crxPathOrBuffer) {
    const buffer = getBuffer(crxPathOrBuffer);
    if (!isCrx(buffer)) {
        throw new Error('Not a CRX format');
    }
    const version = getCrxVersion(buffer);
    console.log(`  CRX version: ${version}`);
    if (version <= 2) {
        const publicKeyLength = buffer.readUInt32LE(8);
        const signatureLength = buffer.readUInt32LE(12);
        return buffer.slice(16 + publicKeyLength + signatureLength);
    }
    else {
        const headerLength = buffer.readUInt32LE(8);
        return buffer.slice(12 + headerLength);
    }
}
exports.getZipContents = getZipContents;
function extract(crxPathOrBuffer, output = process.cwd()) {
    const contents = getZipContents(crxPathOrBuffer);
    const zip = new adm_zip_1.default(contents);
    zip.extractAllTo((0, path_1.resolve)(output));
}
exports.extract = extract;
//# sourceMappingURL=parser.js.map
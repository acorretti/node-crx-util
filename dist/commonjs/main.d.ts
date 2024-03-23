/**
 * Download a CRX file by url
 * @param {String} url Chrome/Edge extension url
 * @param {String} output If `output` ends with ".crx", it will be saved as a CRX file, otherwise it will be extracted to `${output}/${extensionId}`. Default by `process.cwd()`.
 * @return
 * @public
 */
export declare function downloadByURL(url: string, output?: string): Promise<{
    result: boolean;
    extensionId: string;
    source: string;
    downloadURL: string;
    output: string;
    error?: Error | undefined;
}>;
export declare function downloadById(extensionId: string, source: string, output?: string): Promise<{
    result: boolean;
    extensionId: string;
    source: string;
    downloadURL: string;
    output: string;
    error?: Error;
}>;
//# sourceMappingURL=main.d.ts.map
export declare const URL_PATTERN: {
    chrome: string;
    edge: string;
};
export declare function getDownloadURL(extensionId: string, source: keyof typeof URL_PATTERN): string;
export declare function getExtensionId(url: string): string;
export declare function parseURL(url: string): {
    extensionId: string;
    source: "chrome" | "edge";
};
export declare function downloadByURL(url: string): Promise<ArrayBuffer>;
export declare function downloadById(extensionId: string, source: keyof typeof URL_PATTERN): Promise<ArrayBuffer>;
//# sourceMappingURL=downloader.d.ts.map
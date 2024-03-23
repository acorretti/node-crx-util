/// <reference types="node" />
export declare function isCrx(crxPathOrBuffer: string | Buffer): boolean;
export declare function getCrxVersion(crxPathOrBuffer: string | Buffer): number;
export declare function getZipContents(crxPathOrBuffer: string | Buffer): Buffer;
export declare function extract(crxPathOrBuffer: string | Buffer, output?: string): void;
//# sourceMappingURL=parser.d.ts.map
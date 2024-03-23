export const URL_PATTERN = {
    chrome: 'https://clients2.google.com/service/update2/crx?response=redirect&prodversion=49.0&acceptformat=crx3&x=id%3D[EXTENSION_ID]%26installsource%3Dondemand%26uc',
    edge: 'https://edge.microsoft.com/extensionwebstorebase/v1/crx?response=redirect&x=id%3D[EXTENSION_ID]%26installsource%3Dondemand%26uc',
};
export function getDownloadURL(extensionId, source) {
    return URL_PATTERN[source].replace('[EXTENSION_ID]', extensionId);
}
export function getExtensionId(url) {
    return new URL(url).pathname.split('/').pop();
}
export function parseURL(url) {
    let extensionId = '';
    let source = 'chrome';
    if (url.startsWith('https://chrome.google.com/')) {
        extensionId = getExtensionId(url);
        source = 'chrome';
    }
    else if (url.startsWith('https://microsoftedge.microsoft.com/')) {
        extensionId = getExtensionId(url);
        source = 'edge';
    }
    return { extensionId, source };
}
export function downloadByURL(url) {
    const { extensionId, source } = parseURL(url);
    return downloadById(extensionId, source);
}
export async function downloadById(extensionId, source) {
    const url = getDownloadURL(extensionId, source);
    return fetch(url).then((response) => {
        if (!response.ok || response.status !== 200) {
            throw new Error(`unable to download the CRX file [status: ${response.status}]`);
        }
        return response.arrayBuffer();
    });
}
//# sourceMappingURL=downloader.js.map
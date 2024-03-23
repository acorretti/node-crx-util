import { resolve } from 'path'
import { readFileSync } from 'fs'
import AdmZip from 'adm-zip'

function getBuffer(crxPathOrBuffer: string | Buffer) {
  return typeof crxPathOrBuffer === 'string'
    ? readFileSync(crxPathOrBuffer)
    : crxPathOrBuffer
}

export function isCrx(crxPathOrBuffer: string | Buffer) {
  const buffer = getBuffer(crxPathOrBuffer)
  const magic = buffer.readUInt32BE(0)
  return magic === 0x43723234 // Cr24
}

export function getCrxVersion(crxPathOrBuffer: string | Buffer) {
  const buffer = getBuffer(crxPathOrBuffer)
  return buffer.readUInt32LE(4)
}

export function getZipContents(crxPathOrBuffer: string | Buffer) {
  const buffer = getBuffer(crxPathOrBuffer)

  if (!isCrx(buffer)) {
    throw new Error('Not a CRX format')
  }

  const version = getCrxVersion(buffer)
  console.log(`  CRX version: ${version}`)

  if (version <= 2) {
    const publicKeyLength = buffer.readUInt32LE(8)
    const signatureLength = buffer.readUInt32LE(12)
    return buffer.slice(16 + publicKeyLength + signatureLength)
  } else {
    const headerLength = buffer.readUInt32LE(8)
    return buffer.slice(12 + headerLength)
  }
}

export function extract(
  crxPathOrBuffer: string | Buffer,
  output = process.cwd()
) {
  const contents = getZipContents(crxPathOrBuffer)
  const zip = new AdmZip(contents)
  zip.extractAllTo(resolve(output))
}

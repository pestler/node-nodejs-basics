import path from 'path';
import fs from 'fs';
const {
    createHash
} = await import('crypto');
import { getPathUrl } from '../util/get-url-path.js';

const filesDir = 'files';

const calculateHash = async () => {
    const filePath = path.resolve(getPathUrl(import.meta.url),filesDir, 'fileToCalculateHashFor.txt')
    const buffer = fs.readFileSync(filePath)
    const hash = createHash('sha256').update(buffer).digest('hex')
    console.log(`SHA256 hash: ${hash}`);
};

await calculateHash();


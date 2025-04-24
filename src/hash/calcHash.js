import path from 'path';
import fs from 'fs';
const { createHash } = await import('crypto');
import { getPathUrl } from '../util/get-url-path.js';

const filesDir = 'files';
const calculateHash = async () => {
    const fileName = process.argv[2] || 'fileToCalculateHashFor.txt';
    const filePath = path.resolve(getPathUrl(import.meta.url), filesDir, fileName);

    try {
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            process.exit(1);
        }

        const buffer = await fs.promises.readFile(filePath);
        const hash = createHash('sha256').update(buffer).digest('hex');
        console.log(`SHA256 hash: ${hash}`);
    } catch (error) {
        console.error('Error calculating hash:', error.message);
    }
};

await calculateHash();

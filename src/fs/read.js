import path from 'path';
import { access } from 'fs/promises';
import { createReadStream } from 'fs';

import { getPathUrl } from '../util/get-url-path.js';
import { PropertyRequiredError } from '../util/validation-error.js';

const filesDir = 'files';
const sourceFile = path.resolve(getPathUrl(import.meta.url), filesDir, 'fileToRead.txt');

const read = async () => {
    try {
        try {
            await access(sourceFile);
        } catch {
            throw new PropertyRequiredError('FS operation failed');
        }

        const streamRead = createReadStream(sourceFile, 'utf-8');

        streamRead.on('data', (chunk) => process.stdout.write(chunk));
        streamRead.on('end', () => console.log('\nRead operation completed.'));
        streamRead.on('error', (err) => console.error('Stream error:', err.message));
    } catch (error) {
        console.error('FS operation failed', error.message);
        throw error;
    }
};

await read();

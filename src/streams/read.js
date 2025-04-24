import path from 'path';
import { createReadStream } from 'fs';
import { getPathUrl } from '../util/get-url-path.js';

const filesDir = 'files';

const read = async () => {
    const fileRead = path.resolve(getPathUrl(import.meta.url), filesDir, 'fileToRead.txt');

    try {
        const streamRead = createReadStream(fileRead);

        streamRead.pipe(process.stdout, { end: false });

        streamRead.on('end', () => {
            console.log('\nFile reading completed.');
        });

        streamRead.on('error', (error) => {
            console.error(`Error reading file: ${error.message}`);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

await read();

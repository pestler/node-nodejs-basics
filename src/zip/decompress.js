import { createReadStream, createWriteStream } from 'fs';
import fsPromises from 'fs/promises';
import { pipeline } from 'stream';
import path from 'path';
import zlib from 'zlib';

import { getPathUrl } from '../util/get-url-path.js';

const filesDir = 'files';

const decompress = async () => {
    const sourcePath = path.resolve(getPathUrl(import.meta.url), filesDir, 'archive.gz');
    const targetPath = path.resolve(getPathUrl(import.meta.url), filesDir, 'fileToCompress.txt');

    try {
        await fsPromises.access(sourcePath);

        const readFile = createReadStream(sourcePath);
        const writeFile = createWriteStream(targetPath);

        pipeline(
            readFile,
            zlib.createGunzip(),
            writeFile,
            (error) => {
                if (error) {
                    console.error(`Error during decompression: ${error.message}`);
                    process.exit(1);
                } else {
                    console.log(`File decompressed successfully to: ${targetPath}`);
                }
            }
        );
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }

    process.on('SIGINT', () => {
        console.error('\nProcess interrupted by user. Decompression stopped.');
        process.exit(1);
    });
};

await decompress();

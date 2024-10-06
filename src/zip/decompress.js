import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import path from 'path';
import zlib from 'zlib';

import { getPathUrl } from '../util/get-url-path.js'

const filesDir = 'files';

const decompress = async () => {
    const sourcePath = path.resolve(getPathUrl(import.meta.url), filesDir, 'archive.gz');
    const targetPath = path.resolve(getPathUrl(import.meta.url), filesDir, 'fileToCompress.txt');
    const readFile = createReadStream(sourcePath);
    const writeFile = createWriteStream(targetPath);


    pipeline(
        readFile,
        zlib.createGunzip(),
        writeFile,
        (error) => error && process.stderr.write(error)
        );
};

await decompress();
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import path from 'path';
import zlib from 'zlib';

import { getPathUrl } from '../util/get-url-path.js'

const filesDir = 'files';

const compress = async () => {

    const sourcePath = path.resolve(getPathUrl(import.meta.url), filesDir, 'fileToCompress.txt');
    const targetPath = path.resolve(getPathUrl(import.meta.url), filesDir, 'archive.gz');
    const readFile = createReadStream(sourcePath);
    const writeFile = createWriteStream(targetPath);


    pipeline(
        readFile,
        zlib.createGzip(),
        writeFile,
        (error) => error && process.stderr.write(error)
        );
};

await compress();


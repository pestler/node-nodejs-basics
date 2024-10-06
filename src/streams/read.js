import path from 'path'
import { createReadStream } from 'fs';
import { getPathUrl } from '../util/get-url-path.js';

const filesDir = 'files';

const read = async () => {
const fileRead = path.resolve(getPathUrl(import.meta.url), filesDir, 'fileToRead.txt')
const streamRead = createReadStream(fileRead)
streamRead.pipe(process.stdout, { end: false });
};

await read();



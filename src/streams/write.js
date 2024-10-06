import path from 'path'
import { createWriteStream } from 'fs';
import { stdin, stderr, exit } from 'process';
import { getPathUrl } from '../util/get-url-path.js';

const filesDir = 'files';
const write = async () => {
    const fileWrite = path.resolve(getPathUrl(import.meta.url), filesDir, 'fileToWrite.txt')
    const fileToWrite = createWriteStream(fileWrite)

    stdin.pipe(fileToWrite).on('error', (err) => stderr.write(err))
    process.on('SIGINT', () => {
        fileToWrite.end();
        exit();
    })    
};

await write();



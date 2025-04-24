import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { stdin, exit } from 'process';
import { getPathUrl } from '../util/get-url-path.js';

const filesDir = 'files';

const write = async () => {
    const fileWrite = path.resolve(getPathUrl(import.meta.url), filesDir, 'fileToWrite.txt');

    try {
        try {
            await fsPromises.access(filesDir);
        } catch {
            console.error(`Directory '${filesDir}' does not exist. Creating it now...`);
            await fsPromises.mkdir(filesDir, { recursive: true });
        }

        const fileToWrite = fs.createWriteStream(fileWrite);

        stdin.pipe(fileToWrite);

        fileToWrite.on('finish', () => {
            console.log('File write completed successfully.');
        });

        fileToWrite.on('error', (err) => {
            console.error(`Error writing to file: ${err.message}`);
        });

        process.on('SIGINT', () => {
            console.log('\nProcess terminated by user. File stream closed.');
            fileToWrite.end();
            exit();
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

await write();

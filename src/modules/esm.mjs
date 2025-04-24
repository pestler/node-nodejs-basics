import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from "url";
import { getPathUrl } from '../util/get-url-path.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = getPathUrl(import.meta.url);

const random = Math.random();

let unknownObject;

const pathFile = async (file) => JSON.parse(
    await readFile(new URL(file, import.meta.url))
);

try {
    if (random > 0.5) {
        unknownObject = await pathFile('./files/a.json');
    } else {
        unknownObject = await pathFile('./files/b.json');
    }
} catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error reading JSON file:', error.message);
    process.exit(1);
}

console.log(`Release: ${release()}`);
console.log(`Version: ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = process.env.PORT || 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

process.on('SIGINT', () => {
    myServer.close(() => {
        console.log('\nServer has been terminated.');
        process.exit(0);
    });
});

export {
    unknownObject,
    myServer,
};

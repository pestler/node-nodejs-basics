import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from "url";
import { getPathUrl } from '../util/get-url-path.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = getPathUrl(import.meta.url)

const random = Math.random();

let unknownObject

const pathFile = async (file) => JSON.parse(
    await readFile(new URL(file, import.meta.url)
    )
);

if (random > 0.5) {    
    unknownObject = JSON.parse(
        await readFile(
            new URL('./files/a.json', import.meta.url)
        )
    );
} else {    
    unknownObject = JSON.parse(
        await readFile(
            new URL('./files/b.json', import.meta.url)
        )
    );
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};




import { access, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getPathUrl } from '../util/get-url-path.js';
import { PropertyRequiredError } from '../util/validation-error.js';

const filesDir = 'files';
const newFileName = 'fresh.txt';
const absolutePath = path.resolve(getPathUrl(import.meta.url), filesDir, newFileName);

export const create = async () => {
    try {
        await access(absolutePath);
        throw new PropertyRequiredError('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            const dirPath = path.dirname(absolutePath);
            await mkdir(dirPath, { recursive: true });

            await writeFile(absolutePath, 'I am fresh and young', 'utf8');
            console.log(`File created successfully at ${absolutePath}`);
        } else {
            throw error;
        }
    }
};

await create();

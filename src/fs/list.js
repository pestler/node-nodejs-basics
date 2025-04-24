import path from 'path';
import { access, readdir } from 'fs/promises';
import { getPathUrl } from '../util/get-url-path.js';
import { PropertyRequiredError } from '../util/validation-error.js';

const filesDir = 'files';
const sourcePath = path.resolve(getPathUrl(import.meta.url), filesDir);

const list = async () => {
    try {
        try {
            await access(sourcePath);
        } catch {
            throw new PropertyRequiredError(`FS operation failed`);
        }
        const files = await readdir(sourcePath);
        const arr = files.join(', ')
        console.log(`[${arr}]`)
    } catch (error) {
        console.error('FS operation failed', error.message);
        throw error;
    }
};

await list();

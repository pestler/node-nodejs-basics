import path from 'path';
import { access, rm } from 'fs/promises';
import { getPathUrl } from '../util/get-url-path.js';
import { PropertyRequiredError } from '../util/validation-error.js';

const filesDir = 'files';

const remove = async () => {
    const sourceFile = path.resolve(getPathUrl(import.meta.url), filesDir, 'fileToRemove.txt');

    try {
        try {
            await access(sourceFile);
        } catch {
            throw new PropertyRequiredError(`FS operation failed`);
        }

        await rm(sourceFile);
        console.log(`File '${sourceFile}' removed successfully.`);
    } catch (error) {
        console.error('FS operation failed', error.message);
        throw error;
    }
};

await remove();

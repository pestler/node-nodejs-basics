import path from 'path';
import { access, rename as renamePromise } from 'fs/promises';
import { getPathUrl } from '../util/get-url-path.js';
import { PropertyRequiredError } from '../util/validation-error.js';

const filesDir = 'files';

const rename = async () => {
    const sourceFile = path.resolve(getPathUrl(import.meta.url), filesDir, 'wrongFilename.txt');
    const targetRenameFile = path.resolve(getPathUrl(import.meta.url), filesDir, 'properFilename.md');

    try {
        try {
            await access(sourceFile);
        } catch {
            throw new PropertyRequiredError('FS operation failed: source file does not exist');
        }
        try {
            await access(targetRenameFile);
            throw new PropertyRequiredError('FS operation failed: target file already exists');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }

        await renamePromise(sourceFile, targetRenameFile);
        console.log(`File '${sourceFile}' successfully renamed to '${targetRenameFile}'`);
    } catch (error) {
        console.error(error.message);
        throw new PropertyRequiredError('FS operation failed');
    }
};

await rename();

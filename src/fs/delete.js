import path from 'path';
import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import { getPathUrl } from '../util/get-url-path.js'
import { PropertyRequiredError } from '../util/validation-error.js'

const filesDir = 'files';

const remove = async () => {
    const sourceFile = path.resolve(getPathUrl(import.meta.url), filesDir, 'fileToRemove.txt');
    
    try {
        const sourceFileExist = existsSync(sourceFile);
        if (!sourceFileExist) {
            throw new PropertyRequiredError('FS operation failed');
        }

        await rm(sourceFile);
    } catch (error) {
        throw error;
    }
}


await remove();



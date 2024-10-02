import path from 'path';
import { existsSync } from 'fs';
import { getPathUrl } from '../util/get-url-path.js'
import { PropertyRequiredError } from '../util/validation-error.js'
import {createDirectory} from '../util/create-dir.js'
import { copyDir } from '../util/copy-directory.js'

const source = 'files';
const target = 'files_copy';

const sourcePath = path.resolve(getPathUrl(import.meta.url), source);
const targetPath = path.resolve(getPathUrl(import.meta.url), target);

const copy = async () => {

try {
    const filesExistsSync = existsSync(sourcePath);
    const filesCopyExistsSync = existsSync(targetPath);

    if (!filesExistsSync || filesCopyExistsSync) {
        throw new PropertyRequiredError('FS operation failed');
    } else if (!filesCopyExistsSync){
        createDirectory(targetPath)
    }    
} catch (error) {
    throw error;
}
copyDir(sourcePath, targetPath)

};

await copy();



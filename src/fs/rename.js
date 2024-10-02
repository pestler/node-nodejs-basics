import path from 'path';
import { existsSync } from 'fs';
import { rename as renamePromise } from 'fs/promises';
import { getPathUrl } from '../util/get-url-path.js'
import { PropertyRequiredError } from '../util/validation-error.js'

const filesDir = 'files';

const rename = async () => {
    const sourceFile = path.resolve(getPathUrl(import.meta.url), filesDir, 'wrongFilename.txt');
    const targetRenameFile = path.resolve(getPathUrl(import.meta.url), filesDir, 'wrongFilename.md');
    try {
        const sourceFileExist = existsSync(sourceFile);
        const targetFileExists = existsSync(targetRenameFile);

        if (!sourceFileExist || targetFileExists) {
            throw new PropertyRequiredError('FS operation failed');
        }

        await renamePromise(sourceFile, targetRenameFile);
    } catch (error) {
        throw error;
    }
}
await rename();


/* rename.js - реализует функцию, которая переименовывает файл wrongFilename.txt в properFilename с расширением .md (если файл wrongFilename.txt отсутствует
или properFilename.md уже существует, должна быть выдана ошибка с сообщением FS operation failed) */
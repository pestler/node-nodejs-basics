import { stat, writeFile } from 'fs';
import path from 'path';
import { getPathUrl } from '../util/get-url-path.js'
import { PropertyRequiredError } from '../util/validation-error.js'


const filesDir = 'files';
const newFileName = 'fresh.txt';
const absolutePath = path.resolve(getPathUrl(import.meta.url), filesDir, newFileName);
const callbackError = (err) => {
    if (err) throw err;
}

export const create = async () => {
    stat(absolutePath, (error) => {
        if (error == null) {
            throw new PropertyRequiredError('FS operation failed');
        } else if (error.code === 'ENOENT') {
            writeFile(absolutePath, 'I am fresh and young', 'utf8', callbackError);
        } else {
            throw error;
        }
    })
};

create();

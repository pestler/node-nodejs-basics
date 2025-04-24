import path from 'path';
import fs from 'fs';
import { getPathUrl } from '../util/get-url-path.js';
import { createDirectory } from '../util/create-dir.js';
import { PropertyRequiredError } from '../util/validation-error.js';

const source = 'files';
const target = 'files_copy';

const sourcePath = path.resolve(getPathUrl(import.meta.url), source);
const targetPath = path.resolve(getPathUrl(import.meta.url), target);

const copyFileStream = async (src, dest) => {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(src);
        const writeStream = fs.createWriteStream(dest);

        readStream.on('error', reject);
        writeStream.on('error', reject);
        writeStream.on('finish', resolve);

        readStream.pipe(writeStream);
    });
};

const copyDirWithStreams = async (src, dest) => {
    try {
        await createDirectory(dest);
        const entries = await fs.promises.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                await copyDirWithStreams(srcPath, destPath);
            } else {
                await copyFileStream(srcPath, destPath);
                console.log(`File copied: ${srcPath}`);
            }
        }
    } catch (error) {
        throw new PropertyRequiredError('FS operation failed');
    }
};

const copy = async () => {
    try {
        const sourceStat = await fs.promises.stat(sourcePath).catch(() => {
            throw new PropertyRequiredError('FS operation failed');
        });

        if (!sourceStat.isDirectory()) {
            throw new PropertyRequiredError('FS operation failed');
        }

        const targetExists = await fs.promises.access(targetPath).then(() => true).catch(() => false);
        if (targetExists) {
            throw new PropertyRequiredError('FS operation failed');
        }

        await copyDirWithStreams(sourcePath, targetPath);
        console.log('Copy operation completed successfully!');
    } catch (error) {
        console.error('Error:', error.message);
        throw new PropertyRequiredError('FS operation failed');
    }
};

await copy();

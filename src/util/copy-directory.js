import path from 'path';
import { readdir , copyFile} from 'fs/promises';

export const copyDir = async (src, dest) => {
    try {        
        const dataFiles = await readdir(src, {
            withFileTypes: true,
        });        
        for (let data of dataFiles) {
            const srcPath = path.join(src, data.name);
            const destPath = path.join(dest, data.name);
            data.isDirectory()
                ? await copyDir(srcPath, destPath)
                : await copyFile(srcPath, destPath);
        }
    } catch (error) {
        throw error;
    }
};
import fs from 'fs/promises';
import path from 'path';

export const copyDir = async (src, dest) => {
    try {
        await fs.mkdir(dest, { recursive: true });
        const dataFiles = await fs.readdir(src, { withFileTypes: true });

        const tasks = dataFiles.map(async (data) => {
            const srcPath = path.join(src, data.name);
            const destPath = path.join(dest, data.name);

            if (data.isDirectory()) {
                await copyDir(srcPath, destPath);
            } else {
                try {
                    await fs.copyFile(srcPath, destPath);
                    console.log(`File copied: ${srcPath}`);
                } catch (error) {
                    console.error(`Error copying ${srcPath}: ${error.message}`);
                }
            }
        });

        await Promise.all(tasks);
        console.log(`Copying completed from ${src} to ${dest}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};

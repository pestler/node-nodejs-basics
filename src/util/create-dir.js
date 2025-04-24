import { mkdir } from 'fs/promises';

export const createDirectory = async (dir) => {
    try {
        await mkdir(dir, { recursive: true });
    } catch (err) {
        throw err;
    }
};

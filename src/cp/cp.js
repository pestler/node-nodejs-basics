import path from 'path';
import { fork } from 'child_process';

import { getPathUrl } from '../util/get-url-path.js';

const filesDir = 'files';

export const spawnChildProcess = async (args) => {
    const sourcePath = path.resolve(getPathUrl(import.meta.url), filesDir, 'script.js');

    try {
        const childProcess = fork(sourcePath, args);

        childProcess.on('error', (error) => {
            console.error(`Error spawning child process: ${error.message}`);
        });

        childProcess.on('exit', (code) => {
            console.log(`Child process exited with code: ${code}`);
        });

        console.log(`Child process started with arguments: ${JSON.stringify(args)}`);
    } catch (error) {
        console.error(`Failed to spawn child process: ${error.message}`);
    }
};

spawnChildProcess(['Argument1', 'Argument2', 'Argument3']);

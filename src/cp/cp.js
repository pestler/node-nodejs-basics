import path from 'path';
import { fork } from 'child_process';

import { getPathUrl } from '../util/get-url-path.js'
const filesDir = 'files';

export const spawnChildProcess = async (args) => {
    
    const sourcePath = path
    .resolve(getPathUrl(import.meta.url), filesDir, 'script.js');

    fork(sourcePath, args);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['Argument1', 'Argument2', 'Argument3']);


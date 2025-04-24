import { cpus } from 'os';
import path from 'path';
import { Worker } from 'worker_threads';
import fsPromises from 'fs/promises';

import { getPathUrl } from '../util/get-url-path.js';

const performCalculations = async () => {
    const workerPath = path.resolve(getPathUrl(import.meta.url), 'worker.js');

    try {
        await fsPromises.access(workerPath);
    } catch {
        console.error(`Worker file not found: ${workerPath}`);
        process.exit(1);
    }

    const number = parseInt(process.argv[2], 10) || 10;
    const workerArr = [];

    const arrWorkers = cpus().map((_el, i) => {
        return new Promise((resolve, reject) => {
            const myWorker = new Worker(workerPath);
            workerArr.push(myWorker);

            myWorker.postMessage(number + i);

            myWorker.on("message", (data) => resolve({ status: 'resolved', data }));
            myWorker.on("error", (err) => reject({ status: 'error', data: null, error: err.message }));
        });
    });

    const res = await Promise.all(arrWorkers);

    try {
        for (const worker of workerArr) {
            await worker.terminate();
        }
        console.log('Workers terminated successfully.');
    } catch (err) {
        console.error('Error terminating workers:', err.message);
    }

    console.log('All calculations completed successfully:', res);
};

await performCalculations();

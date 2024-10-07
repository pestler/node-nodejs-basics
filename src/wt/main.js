import { cpus } from 'os';
import path from 'path';
import { Worker } from 'worker_threads';

import { getPathUrl } from '../util/get-url-path.js'

const performCalculations = async () => {
    const workerPath = path.resolve(getPathUrl(import.meta.url), 'worker.js');

    let workerArr = [];
    let number = 10
    const arrWorkers = cpus().map((_el, i) => {
        return new Promise((resolve, reject) => {
            const myWorker = new Worker(workerPath);
            workerArr
                .push(myWorker);
            myWorker
                .postMessage(number + i);
            myWorker
                .on("message", (data) => resolve({ status: 'resolved', data }));
            myWorker
                .on("error", () => reject({ status: 'error', data: null }));
        });
    });

    const res = await Promise.all(arrWorkers);
    for (const worker of workerArr) {
        worker.terminate();
    }
    console.log(res);
};


await performCalculations();





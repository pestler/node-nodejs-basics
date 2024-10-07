import { workerData, parentPort } from 'worker_threads';

export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
    parentPort.once('message', (message) => {
        parentPort.postMessage(nthFibonacci(message));
    });
};

sendResult();


import { parentPort } from 'worker_threads';

const memo = {};

export const nthFibonacci = (n) => {
    if (n < 2) return n;
    if (memo[n]) return memo[n];
    memo[n] = nthFibonacci(n - 1) + nthFibonacci(n - 2);
    return memo[n];
};

export const sendResult = () => {
    parentPort.once('message', (message) => {
        if (typeof message !== 'number' || message < 0) {
            parentPort.postMessage('Invalid input. Please provide a non-negative integer.');
        } else {
            try {
                parentPort.postMessage(nthFibonacci(message));
            } catch (error) {
                parentPort.postMessage(`Error occurred: ${error.message}`);
            }
        }
    });
};

sendResult();

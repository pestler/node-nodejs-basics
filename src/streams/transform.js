import { Transform } from 'stream';
import { pipeline } from 'stream';

const reversText = (data) => data
    .trim()
    .split('')
    .reverse()
    .join('')
    .concat('\n');

export const reverseTransform = new Transform({
    transform(chunk, _encoding, callback) {
        this.push(reversText(chunk.toString()));
        callback();
    }
});

const transform = async () => {
    console.log('Enter text to reverse (Ctrl+C to exit):');

    pipeline(
        process.stdin,
        reverseTransform,
        process.stdout,
        (error) => {
            if (error) {
                console.error('Error during transformation:', error.message);
                process.exit(1);
            }
        }
    );
};

await transform();

import { Transform } from 'stream';
import { pipeline } from 'stream';

const reversText = (data) => data
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

    pipeline(process.stdin, reverseTransform, process.stdout,
        (error) => error && process.stderr.write(error)
    )
    console.log('Enter text:');
};

await transform();


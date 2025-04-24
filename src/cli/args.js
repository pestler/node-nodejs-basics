const parseArgs = () => {
    const args = process.argv.slice(2);

    if (args.length % 2 !== 0) {
        throw new Error('Each key must have a corresponding value.');
    }

    const formattedArgs = args.reduce((acc, el, i, arr) => {
        if (el.startsWith('--') && i % 2 === 0) {
            acc.push(`${el.slice(2)} is ${arr[i + 1]}`);
        } else if (!el.startsWith('--') && i % 2 === 0) {
            throw new Error(`Invalid argument format: '${el}' (key must start with '--')`);
        }
        return acc;
    }, []);

    console.log(formattedArgs.join(', '));
};

try {
    parseArgs();
} catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `Error: ${error.message}`); 
}

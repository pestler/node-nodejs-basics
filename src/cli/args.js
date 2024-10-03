const parseArgs = () => {
    const propResult = process.argv
        .slice(2)
        .reduce((acc, el, i, arr) => {
            if ((i < arr.length - 1) && (i % 2 === 0)) {
                acc.push(
                    `${el.slice(2)} is ${arr[i + 1]}`
                )
            }
            return acc
        }, [])
        .join(', ')

    console.log(propResult);
};

parseArgs();

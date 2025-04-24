const parseEnv = () => {
    const env = Object.entries(process.env)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    console.log(env || 'No RSS_ environment variables found');
};

parseEnv();

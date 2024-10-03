const parseEnv = () => {    
    const env = Object.entries(process.env)
        .filter((a) =>a.find((_p) => _p.startsWith('RSS_')))
        .map((r)=>r.join('=')).join('; ')
    console.log(env);
};

parseEnv();
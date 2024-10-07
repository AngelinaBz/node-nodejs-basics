const parseArgs = () => {
    const args = process.argv.slice(2);
    const outputArray = [];
    
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace('--', '');
        const value = args[i + 1];
        outputArray.push(`${key} is ${value}`);
    }

    const result = outputArray.join(', ');

    console.log(result);
};

parseArgs();
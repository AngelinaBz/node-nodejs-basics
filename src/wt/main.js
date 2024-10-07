import { Worker } from 'worker_threads';
import os from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'worker.js');
    
    const numCPUs = os.cpus().length;
    const initialNumber = 10;

    const promises = [];

    for (let i = 0; i < numCPUs; i++) {
        const worker = new Worker(filePath);

        const count = initialNumber + i;
        
        const promise = new Promise((resolve) => {
            worker.on('message', (result) => {
                resolve(result);
            });

            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });
        });

        promises.push(promise);
        worker.postMessage(count);
    }

    const results = await Promise.all(promises);
    
    console.log(results);
};

await performCalculations();
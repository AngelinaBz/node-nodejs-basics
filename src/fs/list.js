import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filesDir = join(__dirname, 'files');
    try {
        await fs.promises.access(filesDir);
        const files = await fs.promises.readdir(filesDir);
        files.forEach(file => {
            console.log(file);
        });
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw error; 
    }
};

await list();
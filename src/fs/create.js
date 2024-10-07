import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fresh.txt');
    
    try {
        await fs.promises.access(filePath);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.promises.writeFile(filePath, 'I am fresh and young');
        } else {
            throw error;
        }
    }
};

await create();
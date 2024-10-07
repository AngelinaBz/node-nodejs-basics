import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const deletedFile = join(__dirname, 'files', 'fileToRemove.txt');

    try {
        await fs.promises.access(deletedFile);
        await fs.promises.rm(deletedFile);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw error; 
        }
    }
};

await remove();
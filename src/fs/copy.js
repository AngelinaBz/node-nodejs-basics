import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const path = join(__dirname, 'files');
    const copyPath = join(__dirname, 'files_copy');


    try {
        await fs.promises.stat(path);
    } catch (error) {
        throw new Error('FS operation failed');
    }

    try {
        await fs.promises.stat(copyPath);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
        await fs.promises.mkdir(copyPath);
        await fs.promises.cp(path, copyPath, { recursive: true });
    }
};

await copy();
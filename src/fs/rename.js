import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const oldFileName = join(__dirname, 'files', 'wrongFilename.txt');
    const newFileName = join(__dirname, 'files', 'properFilename.md');
    try {
        await fs.promises.access(oldFileName);
    } catch (error) {
        throw new Error('FS operation failed');
    }

    try {
        await fs.promises.access(newFileName);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }

    await fs.promises.rename(oldFileName, newFileName);
};

await rename();
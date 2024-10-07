import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    try {
        await fs.promises.access(filePath);
        const content = await fs.promises.readFile(filePath, 'utf-8');
        console.log(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw error;
        }
    }
};

await read();
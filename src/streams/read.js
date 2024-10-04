import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stdout } from 'process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const readFile = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    const readStream = fs.createReadStream(readFile, 'utf-8');
    readStream.on('data', (chunck) => stdout.write(chunck + "\n"))
};

await read();
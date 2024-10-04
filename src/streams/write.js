import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stdin, stdout } from 'process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const writeFile = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const writeStream = fs.createWriteStream(writeFile, 'utf-8');
    stdout.write('Write something: \n');
    stdin.on('data', (chunk) => {
        writeStream.write(chunk + '\n');
    });
    stdin.on('end', () => {
        writeStream.end();
    });
};

await write();
import fs from 'fs';
import path from 'path';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';
import { release, version } from 'os';
import './files/c.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const aFilePath = path.join(__dirname, 'files', 'a.json');
const bFilePath = path.join(__dirname, 'files', 'b.json');

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = await fs.promises.readFile(aFilePath, 'utf-8');
} else {
    unknownObject = await fs.promises.readFile(bFilePath, 'utf-8');
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};


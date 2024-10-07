import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'script.js');
    const child = spawn('node', [filePath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);

    child.on('error', (err) => {
        console.error(`Error: ${err}`);
    });

    child.on('exit', (code) => {
        console.log(`Success ${code}`);
    });
};

spawnChildProcess(['someArgument1', 'someArgument2']);

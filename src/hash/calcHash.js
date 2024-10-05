import { createHash } from 'crypto';
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
    const hash = createHash('sha256');
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const fileStream = fs.createReadStream(file);

    try {
		await fs.promises.access(file);

		fileStream.on('data', chunk => {
			hash.update(chunk);
		});
		fileStream.on('end', () => {
			console.log(hash.digest('hex'));
		});
	} catch (err) {
		if (err.code === 'ENOENT') {
			throw new Error(`Failed`);
		}
	}
};

await calculateHash();
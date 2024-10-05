import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';

const compress = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fileToCompress.txt');
    const compressedFile = join(__dirname, 'files', 'archive.gz');

    try {
        await fs.promises.access(filePath);
        const gzip = createGzip();
        const readStream = fs.createReadStream(filePath);
		const writeStream = fs.createWriteStream(compressedFile);

        readStream.pipe(gzip).pipe(writeStream);
        
        return new Promise((resolve, reject) => {
            writeStream.on('finish', async () => {
                try {
                    await fs.promises.unlink(filePath);
                    resolve();
                } catch (error) {
                    reject(new Error('Failed'));
                }
            });

            writeStream.on('error', reject);
        });
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('File not found');
        } else {
            throw error;
        }
    }
};

await compress();
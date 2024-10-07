import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';

const decompress = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fileToCompress.txt');
    const compressedFile = join(__dirname, 'files', 'archive.gz'); 

    try {
        await fs.promises.access(compressedFile);
        const gunzip = createGunzip();
        const readStream = fs.createReadStream(compressedFile);
		const writeStream = fs.createWriteStream(filePath);

        readStream.pipe(gunzip).pipe(writeStream);
        
        return new Promise((resolve, reject) => {
            writeStream.on('finish', async () => {
                try {
                    await fs.promises.unlink(compressedFile);
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

await decompress();
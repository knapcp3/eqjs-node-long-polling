import { Readable } from 'stream';

export const readStream = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    let data = '';
    stream.on('error', reject);
    stream.on('data', (chunk) => (data += chunk.toString()));
    stream.on('end', () => resolve(data));
  });
};

import { Keyshade } from '@keyshade/node';
import fs from 'fs';
import path from 'path';

// Helper to load the private key from ~/.keyshade/private-keys.json
function getPrivateKeyFromFile(): string {
  const keyFile = path.join(process.env.HOME || '', '.keyshade', 'private-keys.json');
  if (!fs.existsSync(keyFile)) {
    throw new Error('Keyshade private key file not found at ~/.keyshade/private-keys.json');
  }
  const keys = JSON.parse(fs.readFileSync(keyFile, 'utf-8'));
  // Use the first key in the file (or customize as needed)
  const key = Object.values(keys)[0];
  if (!key) throw new Error('No private key found in ~/.keyshade/private-keys.json');
  return key as string;
}

// Initialize Keyshade client using the private key from file
const keyshade = new Keyshade({
  privateKey: getPrivateKeyFromFile(),
});

export async function getSecret(secretName: string): Promise<string> {
  const secret = await keyshade.getSecret(secretName);
  if (!secret) throw new Error(`Secret ${secretName} not found`);
  return secret;
}

export async function getCloudinarySecrets() {
  const [cloudName, apiKey, apiSecret] = await Promise.all([
    getSecret('CLOUDINARY_CLOUD_NAME'),
    getSecret('CLOUDINARY_API_KEY'),
    getSecret('CLOUDINARY_API_SECRET'),
  ]);
  return {
    cloudName,
    apiKey,
    apiSecret,
  };
}


export function getCloudinarySecrets() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary environment variables are not set.');
  }
  return {
    cloudName,
    apiKey,
    apiSecret,
  };
}

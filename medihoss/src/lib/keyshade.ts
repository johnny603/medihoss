
import { execSync } from 'child_process';

export async function getSecret(secretName: string): Promise<string> {
  try {
    // Use the Keyshade CLI to get the secret
    const output = execSync(`keyshade secret get ${secretName} --no-interactive`, {
      encoding: 'utf-8',
    });
    const secret = output.trim();
    if (!secret) throw new Error(`Secret ${secretName} not found`);
    return secret;
  } catch (err: any) {
    throw new Error(`Failed to retrieve secret '${secretName}' from Keyshade CLI: ${err.message}`);
  }
}


export async function getCloudinarySecretsFromKeyshade() {
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


export function getCloudinarySecretsFromEnv() {
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

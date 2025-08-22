import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getCloudinarySecrets } from '@/lib/keyshade';

// Simple in-memory rate limiter (per process, not distributed)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // max 10 uploads per window per IP
const rateLimitMap = new Map();

export const runtime = 'nodejs'; // Ensure this runs on the server

export async function POST(req: NextRequest) {
  try {
    // --- Authentication check (placeholder) ---
    // Replace with your auth logic (e.g., session, token, etc.)
    // Example: if (!req.headers.get('authorization')) { ... }
    // For now, allow all requests (add real auth for production!)

    // --- Rate limiting ---
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, start: now };
    if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
      // Reset window
      entry.count = 0;
      entry.start = now;
    }
    entry.count++;
    rateLimitMap.set(ip, entry);
    if (entry.count > RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
    }

    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // Validate file type and size
    const allowedTypes = [
      'image/', 'video/', 'audio/',
      'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/', 'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed',
      'application/json', 'application/xml', 'text/html', 'text/markdown', 'application/javascript', 'text/x-python',
      'text/x-java-source', 'text/x-c', 'text/x-c++', 'text/x-script.ruby', 'text/x-go', 'application/x-httpd-php',
      'application/x-sh', 'application/x-bat', 'application/x-powershell', 'application/rtf',
      'application/vnd.oasis.opendocument.text', 'application/vnd.oasis.opendocument.spreadsheet', 'application/vnd.oasis.opendocument.presentation',
      'application/x-iwork-pages-sffpages', 'application/x-iwork-numbers-sffnumbers', 'application/x-iwork-keynote-sffkey'
    ];
    const maxSize = 25 * 1024 * 1024; // 25MB
    // @ts-ignore
    const fileType = file.type || '';
    // @ts-ignore
    const fileSize = file.size || 0;
    if (!allowedTypes.some(type => fileType.startsWith(type)) && !allowedTypes.includes(fileType)) {
      return NextResponse.json({ error: `File type not allowed: ${fileType}` }, { status: 400 });
    }
    if (fileSize > maxSize) {
      return NextResponse.json({ error: 'File is too large. Max size is 25MB.' }, { status: 400 });
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get Cloudinary secrets
  const { cloudName, apiKey, apiSecret } = await getCloudinarySecrets();
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    if (!uploadResult || !uploadResult.secure_url) {
      return NextResponse.json({ error: 'Upload failed. No URL returned from Cloudinary.' }, { status: 500 });
    }

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error: any) {
    let message = 'Upload failed.';
    if (error && error.message) {
      message += ' ' + error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const rawSegments = params.path || [];
    const relativePath = decodeURIComponent(rawSegments.join('/'));

    // Check multiple candidate locations
    const candidates = [
      path.join(process.cwd(), 'assets', relativePath),
      path.join(process.cwd(), 'public', 'assets', relativePath),
      path.join(process.cwd(), 'public', relativePath),
      path.join(process.cwd(), relativePath),
    ];

    let filePath = null;
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        filePath = cand;
        break;
      }
    }

    if (!filePath) {
      return new NextResponse('Asset not found', { status: 404 });
    }

    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();

    let contentType = 'application/octet-stream';
    if (ext === '.pdf') contentType = 'application/pdf';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.svg') contentType = 'image/svg+xml';

    const filename = path.basename(filePath);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    console.error('Asset serve error:', err);
    return new NextResponse('Internal error', { status: 500 });
  }
}

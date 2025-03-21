import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Get allowed origins from environment variable
const getAllowedOrigins = () => {
  const origins = process.env.ALLOWED_ORIGINS;
  if (!origins) return [];
  return origins.split(',').map((origin) => origin.trim());
};

export function middleware(request: NextRequest) {
  // Get the origin from the request headers
  const origin = request.headers.get('origin');
  const allowedOrigins = getAllowedOrigins();

  // Only apply CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const response = NextResponse.next();

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        headers: {
          'Access-Control-Allow-Methods':
            'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Max-Age': '86400', // 24 hours
        },
      });
    }

    // Set CORS headers for actual requests
    if (origin) {
      // If we have specific allowed origins, check against them
      if (allowedOrigins.length > 0) {
        if (allowedOrigins.includes(origin)) {
          response.headers.set('Access-Control-Allow-Origin', origin);

          response.headers.set(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, PATCH, OPTIONS'
          );
          response.headers.set(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization'
          );
        }
      }
    }

    return response;
  }

  return NextResponse.next();
}

// Configure to match only API routes
export const config = {
  matcher: '/api/:path*',
};

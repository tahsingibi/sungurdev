import { NextResponse } from 'next/server';

export function middleware(request) {
  const headers = new Headers(request.headers);
  headers.set('sungurdev-path', request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

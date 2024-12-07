import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;

  // 로그인 상태
  const isLoggedIn = cookies().has('accessToken');

  // 정적파일 일 때 검사를 진행하지 않도록
  const isStaticFile = /\.(.*)$/.test(url.pathname);
  if (isStaticFile) {
    return response;
  }

  // 로그인이 되어있는 상태일때 auth 페이지 접근불가
  if (isLoggedIn) {
    if (url.pathname.includes('/auth')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'], // matcher로 특정 경로 제외
};

import { NextRequest, NextResponse } from "next/server";
import { refreshToken as reissue } from "./service/api/refreshToken";
import { checkCookie, getCookie } from "./utils/cookies";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  
  // 로그인 상태
  const isLoggedIn =
    (await checkCookie("accessToken")) || (await checkCookie("refreshToken"));
  const accessToken = await getCookie("accessToken");
  const refreshToken = await getCookie("refreshToken");

  // 액세스 토큰 갱신 로직
  if (refreshToken && !accessToken) {
    try {
      const newAccessToken = await reissue(refreshToken);

      // 쿠키 옵션 set
      response.cookies.set("accessToken", newAccessToken, {
        domain: ".myspringserver.shop",
        expires: new Date().setHours(new Date().getHours() + 1),
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });

      return response;
    } catch {
      // 리프레시 갱신에 실패했을 경우 루트로 redirect & 저장되어 있는 리프레시 토큰 삭제
      const response = NextResponse.redirect(new URL("/", request.url));

      response.cookies.set("refreshToken", "", {
        expires: new Date(0),
        domain: ".myspringserver.shop",
      });
      return response;
    }
  }

  // 정적파일 일 때 검사를 진행하지 않도록
  const isStaticFile = /\.(.*)$/.test(url.pathname);
  if (isStaticFile) {
    return response;
  }

  // 로그인이 되어 있지 않을 때 접근 할 수 없는 path
  if (!isLoggedIn) {
    // 마이페이지
    if (url.pathname.includes("/my")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // 회원정보 입력
    if (url.pathname.includes("/sign-up")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 로그인이 되어있는 상태 일 때 접근 할 수 없는 path
  if (await isLoggedIn) {
    // 로그인 페이지
    if (url.pathname.includes("/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"], // matcher로 특정 경로 제외
};
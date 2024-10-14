import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("sb-zpoqlmaetyjwslleswlh-auth-token");

  const isLogin = !!accessToken;

  if (!isLogin && (request.nextUrl.pathname.startsWith("/mypage") || request.nextUrl.pathname.startsWith("/review"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};

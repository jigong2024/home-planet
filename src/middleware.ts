import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  await updateSession(request);
  const serverClient = createClient();
  const {
    data: { user }
  } = await serverClient.auth.getUser();

  const isLogin = !!user;

  if (!isLogin && (request.nextUrl.pathname.startsWith("/mypage") || request.nextUrl.pathname.startsWith("/review"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};

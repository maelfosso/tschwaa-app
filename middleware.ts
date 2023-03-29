import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

// export const config = {
//   matcher: '/orgs/:path*'
// }

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname, clone } = nextUrl;
  
  const protectedPaths = ["/orgs/:path*"];
  const isPathProtected = protectedPaths.some((path) => pathname === path)
  const next = NextResponse.next();

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token"
  });
  
  if (pathname === "/auth/sign-in" || pathname === "/auth/sign-up") {
    if (token) {
      const url = new URL(`/orgs`, req.url);
      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/") {
    return next;
  }

  if (pathname.startsWith("/orgs")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  }
  return next;
}

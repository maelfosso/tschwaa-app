import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// export default withAuth(
//   function middleware() {
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized({ token }) {
//         return ["admin", "member"].includes(token?.role);
//       }
//     }
//   }
// )

export { default } from "next-auth/middleware";

export const config = {
  matcher: '/orgs/:path*'
}


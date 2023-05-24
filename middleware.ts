import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  let isLogin = request.cookies.get("name");
  if (!isLogin) {
    if (request.nextUrl.pathname.startsWith("/profile/profile")) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
    //   } else {
    //     if (url.pathname === "/") {
    //       url.pathname = "/dashboard/home";
    //       return NextResponse.redirect(url);
    //     }
    //   }
  }
  if (request.nextUrl.pathname.startsWith("/signin")) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
}

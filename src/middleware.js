import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;
  console.log(request.nextUrl.pathname);
  console.log(authToken);
  const restrictedPathAfterLogin =
    request.nextUrl.pathname === "/signin" ||
    request.nextUrl.pathname === "/signup";
  const restrictedPathBeforeLogin =
    request.nextUrl.pathname === "/profile" ||
    request.nextUrl.pathname === "/view" || 
    request.nextUrl.pathname === "/create" ;
  if (restrictedPathAfterLogin) {
    if (authToken) {
      // console.log("INSIDE REDIRECT!");
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
  if (restrictedPathBeforeLogin) {
    if (!authToken) {
      // console.log("INSIDE REDIRECT!");
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  console.log("middleware executed");
}

export const config = {
  matcher: ["/view", "/signin", "/signup","/profile","/create"],
};
// matcher : ["/view","/signin","/signup","/profile"],

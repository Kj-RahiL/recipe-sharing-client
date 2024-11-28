
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "./helpers/jwtHelpers";

const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  //   console.log("middle", request);
  const { pathname } = request.nextUrl;
  // console.log("pa", pathname);

  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    //Protecting hybrid routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      //   return NextResponse.redirect(new URL("/login", request.url));
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
      );
    }
  }

  //role based authorization

  let decodedToken;
  try {
    decodedToken = decode(accessToken);
  } catch (error) {
    console.error("Failed to decode accessToken", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // console.log(decodedToken, "decodedToken");

  const role = decodedToken?.role;
  // console.log(role);

  if (role === "admin" && pathname.match(/^\/admin-dashboard/)) {
    return NextResponse.next();
  }
  if (role === "user" && pathname.match(/^\/dashboard/)) {
    return NextResponse.next();
  }
  if (pathname === "/feed") {
    return NextResponse.next(); 
  }
  if (pathname === "/feed/:id") {
    return NextResponse.next(); 
  }
  if (pathname === "/profile") {
    return NextResponse.next(); 
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/feed",
    "/feed/:id",
    "/profile",
    "/dashboard/:page*",
    "/admin-dashboard/:page*",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname === "/pages") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
};

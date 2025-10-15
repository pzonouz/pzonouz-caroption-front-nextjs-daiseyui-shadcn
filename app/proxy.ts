import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "https";

  const response = NextResponse.next();
  response.cookies.set("host", host || "");
  response.cookies.set("protocol", protocol);

  return response;
}

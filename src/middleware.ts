import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const url = new URL(request.url);
	const origin = url.origin;
	const pathname = url.pathname;
	const searchParams = Object.fromEntries(url.searchParams.entries());

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-url", request.url);
	requestHeaders.set("x-origin", origin);
	requestHeaders.set("x-pathname", pathname);
	requestHeaders.set("x-search-params", JSON.stringify(searchParams));

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: [
		// match all routes except static files and APIs
		"/((?!_next/static|_next/image|favicon.ico).*)",
	],
};

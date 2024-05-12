import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const pathname = request.nextUrl.pathname.replace("/api/proxy", "");

	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	const rewriteUrl = `${process.env.NEXT_PUBLIC_API_URL}${pathname}`;

	const res = await fetch(rewriteUrl, {
		method: "GET",
		credentials: "include",
		headers: {
			...request.headers,
			Authorization: `Bearer ${accessToken}`,
			Cookie: `refreshToken=${refreshToken}`,
		},
	});

	const json = await res.json();

	if (!res.ok) {
		return NextResponse.json(json, {
			status: res.status,
		});
	}

	const cookiesFromResponse = res.headers.getSetCookie();

	cookieStore.set("accessToken", json.data.accessToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
	});

	return NextResponse.json(json, {
		headers: {
			"Set-Cookie": cookiesFromResponse.join("; "),
		},
	});
}

export async function POST(request: NextRequest) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	const pathname = request.nextUrl.pathname.replace("/api/proxy", "");
	const rewriteUrl = `${process.env.NEXT_PUBLIC_API_URL}${pathname}`;

	const res = await fetch(rewriteUrl, {
		method: "POST",
		body: request.body,
		credentials: "include",
		headers: {
			...request.headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			Cookie: `refreshToken=${refreshToken}`,
		},
	});

	const data = await res.json();

	if (!res.ok) {
		return NextResponse.json(data, {
			status: res.status,
		});
	}

	return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	const pathname = request.nextUrl.pathname.replace("/api/proxy", "");
	const rewriteUrl = `${process.env.NEXT_PUBLIC_API_URL}${pathname}`;

	const res = await fetch(rewriteUrl, {
		method: "PUT",
		body: request.body,
		credentials: "include",
		headers: {
			...request.headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			Cookie: `refreshToken=${refreshToken}`,
		},
	});

	return NextResponse.json(await res.json());
}

export async function DELETE(request: NextRequest) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	const pathname = request.nextUrl.pathname.replace("/api/proxy", "");
	const rewriteUrl = `${process.env.NEXT_PUBLIC_API_URL}${pathname}`;

	const res = await fetch(rewriteUrl, {
		method: "DELETE",
		headers: {
			...request.headers,
			Authorization: `Bearer ${accessToken}`,
			Cookie: `refreshToken=${refreshToken}`,
		},
	});

	return NextResponse.json(await res.json());
}

export async function PATCH(request: NextRequest) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	const pathname = request.nextUrl.pathname.replace("/api/proxy", "");
	const rewriteUrl = `${process.env.NEXT_PUBLIC_API_URL}${pathname}`;

	const res = await fetch(rewriteUrl, {
		method: "PATCH",
		body: request.body,
		credentials: "include",
		headers: {
			...request.headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			Cookie: `refreshToken=${refreshToken}`,
		},
	});

	return NextResponse.json(await res.json());
}

export async function OPTIONS(request: NextRequest) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	const pathname = request.nextUrl.pathname.replace("/api/proxy", "");
	const rewriteUrl = `${process.env.NEXT_PUBLIC_API_URL}${pathname}`;

	const res = await fetch(rewriteUrl, {
		method: "OPTIONS",
		credentials: "include",
		headers: {
			...request.headers,
			Authorization: `Bearer ${accessToken}`,
			Cookie: `refreshToken=${refreshToken}`,
		},
	});

	return NextResponse.json(await res.json());
}

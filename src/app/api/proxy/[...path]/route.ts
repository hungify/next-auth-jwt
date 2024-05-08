import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	const pathname = request.nextUrl.pathname.replace("/api/proxy", "");
	const rewriteUrl = `${process.env.NEXT_PUBLIC_API_URL}${pathname}`;

	const res = await fetch(rewriteUrl, {
		method: "POST",
		body: request.body,
		headers: {
			...request.headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			"Set-Cookie": `refreshToken=${refreshToken}`,
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

export async function GET(request: NextRequest) {
	const pathname = request.nextUrl.pathname.replace("/api/proxy", "");

	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	const rewriteUrl = `${process.env.NEXT_PUBLIC_API_URL}${pathname}`;

	const res = await fetch(rewriteUrl, {
		method: "GET",
		headers: {
			...request.headers,
			Authorization: `Bearer ${accessToken}`,
			"Set-Cookie": `refreshToken=${refreshToken}`,
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
		headers: {
			...request.headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			"Set-Cookie": `refreshToken=${refreshToken}`,
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
			"Set-Cookie": `refreshToken=${refreshToken}`,
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
		headers: {
			...request.headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			"Set-Cookie": `refreshToken=${refreshToken}`,
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
		headers: {
			...request.headers,
			Authorization: `Bearer ${accessToken}`,
			"Set-Cookie": `refreshToken=${refreshToken}`,
		},
	});

	return NextResponse.json(await res.json());
}

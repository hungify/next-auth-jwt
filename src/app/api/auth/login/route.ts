import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const body = await request.json();

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
		method: "POST",
		body: JSON.stringify(body),
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const json = await res.json();
	if (!res.ok) {
		return NextResponse.json(
			{
				message: json.message,
			},
			{
				status: res.status,
			},
		);
	}

	const cookiesFromResponse = res.headers.getSetCookie();

	const response = NextResponse.json(json, {
		headers: {
			"Set-Cookie": cookiesFromResponse.join(", "),
		},
	});

	response.cookies.set("accessToken", json.data.accessToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
	});

	return response;
}

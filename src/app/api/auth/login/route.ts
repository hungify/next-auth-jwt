import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const formData = await request.formData();
	const rawBody = Object.fromEntries(formData);

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
		method: "POST",
		body: JSON.stringify(rawBody),
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

	const cookieStore = cookies();

	cookieStore.set("accessToken", json.data.accessToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
	});

	return NextResponse.json(json, {
		headers: {
			"Set-Cookie": cookiesFromResponse.join(", "),
		},
	});
}

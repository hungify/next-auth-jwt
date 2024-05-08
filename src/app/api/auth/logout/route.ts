import { HttpError } from "@/lib/fetch";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
	try {
		const headers = req.headers;
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
			method: "DELETE",
			headers,
		});
		const json = await res.json();
		if (!res.ok)
			throw new HttpError({
				error: json.error,
				message: json.message,
				statusCode: res.status,
			});

		const cookieStore = cookies();

		cookieStore.delete("accessToken");
		cookieStore.delete("refreshToken");

		return NextResponse.json(json);
	} catch (error) {
		return Promise.reject(error);
	}
}

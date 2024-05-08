import { HttpError } from "@/lib/fetch";

export async function GET(
	_: Request,
	params: { token: string; email: string },
) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/verify?token=${params.token}&email=${params.email}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		const json = await res.json();
		if (!res.ok)
			throw new HttpError({
				error: json.error,
				message: json.message,
				statusCode: res.status,
			});

		return Response.json(json);
	} catch (error) {
		if (error instanceof HttpError) {
			return Response.json(
				{
					error: error.error,
					message: error.message,
				},
				{
					status: error.statusCode,
				},
			);
		}
		return Response.json(
			{
				message: (error as Error).message,
			},
			{
				status: 500,
			},
		);
	}
}

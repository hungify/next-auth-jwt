import { EntityError, HttpError } from "@/lib/fetch";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type VerifyActionState = {
	error: {
		message: string;
	} | null;
	data: {
		message: string;
	} | null;
};

export async function verifyAction(token: string): Promise<VerifyActionState> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/verify?token=${token}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		const json = await res.json();
		if (!res.ok) {
			throw new HttpError({
				error: json.error,
				message: json.message,
				statusCode: res.status,
			});
		}
		revalidatePath("/auth/verify");

		return {
			error: null,
			data: { ...json },
		};
	} catch (error) {
		return Promise.reject(error);
	}
}

type RegisterFormState = NextResponse<{
	error:
		| {
				message: string;
		  }
		| {
				password: string;
				email: string;
		  }
		| null;
	data: { message: string } | null;
}>;

export async function registerAction(
	formData: FormData,
): Promise<RegisterFormState> {
	const rawFormData = Object.fromEntries(formData.entries());

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL}/auth/register`,
			{
				method: "POST",
				body: JSON.stringify(rawFormData),
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		const json = await res.json();

		if (!res.ok) {
			if (res.status === 422) {
				throw new EntityError({
					payload: json.message,
				});
			}

			throw new HttpError({
				error: json.error,
				statusCode: res.status,
				message: json.message,
			});
		}

		return NextResponse.json({
			error: null,
			data: json.data,
		});
	} catch (error) {
		return Promise.reject(error);
	}
}

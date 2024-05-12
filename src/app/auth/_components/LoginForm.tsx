"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EntityError, HttpError } from "@/lib/fetch";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthContext } from "../context";
import { authSchema } from "../schema";
import type { AuthOutput } from "../types";

export default function LoginForm() {
	const form = useForm<AuthOutput["loginBodyRequest"]>({
		resolver: valibotResolver(authSchema.loginBodyRequest),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const authContext = useAuthContext();

	const onSubmit = (body: AuthOutput["loginBodyRequest"]) => {
		startTransition(async () => {
			toast.promise(
				fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
					method: "POST",
					body: JSON.stringify(body),
					credentials: "include",
				}).then(async (res) => {
					const data = await res.json();
					if (!res.ok) {
						if (res.status === 422) {
							throw new EntityError({ payload: data.message });
						}

						throw new HttpError({
							error: data.error,
							message: data.message,
							statusCode: res.status,
						});
					}

					return data;
				}),
				{
					loading: "Logging in...",
					success: async (data) => {
						const response = await fetch(
							`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
							{
								method: "GET",
								cache: "no-store",
								headers: {
									Authorization: `Bearer ${data.data.accessToken}`,
								},
							},
						);
						const userData = await response.json();
						authContext.setUser(userData.data);
						router.push("/");
						router.refresh();

						return "Logged in!";
					},
					error: (error) => {
						if (error instanceof EntityError) {
							for (const err of error.payload) {
								form.setError(err.property, {
									type: "manual",
									message: err.message,
								});
							}
							return "Validation error!";
						}
						console.log("### :: file: LoginForm.tsx:82 :: error:", error);

						return (error as Error).message;
					},
				},
			);

			// try {
			// 	const res = await fetch(
			// 		`${process.env.NEXT_PUBLIC_URL}/api/auth/login`,
			// 		{
			// 			method: "POST",
			// 			body: formData,
			// 		},
			// 	);

			// 	const data = await res.json();

			// 	if (!res.ok) {
			// 		if (res.status === 422) {
			// 			throw new EntityError({ payload: data.message });
			// 		}

			// 		throw new HttpError({
			// 			error: data.error,
			// 			message: data.message,
			// 			statusCode: res.status,
			// 		});
			// 	}

			// 	const response = await fetch(
			// 		`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
			// 		{
			// 			method: "GET",
			// 			cache: "no-store",
			// 			headers: {
			// 				Authorization: `Bearer ${data.data.accessToken}`,
			// 			},
			// 		},
			// 	);
			// 	const userData = await response.json();
			// 	authContext.setUser(userData.data);
			// 	router.push("/");
			// 	router.refresh();
			// } catch (error) {
			// 	if (error instanceof EntityError) {
			// 		for (const err of error.payload) {
			// 			form.setError(err.property, {
			// 				type: "manual",
			// 				message: err.message,
			// 			});
			// 		}
			// 	} else {
			// 		toast.error((error as Error).message);
			// 	}
			// }
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email!" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="Enter your password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={isPending}>
					Submit
				</Button>
			</form>
		</Form>
	);
}

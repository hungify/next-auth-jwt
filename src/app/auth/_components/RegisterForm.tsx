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
import { EntityError, type HttpError } from "@/lib/fetch";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerAction } from "../_server/action";
import { authSchema } from "../schema";
import type { AuthOutput } from "../types";

export default function RegisterForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<AuthOutput["registerBodyRequest"]>({
		resolver: valibotResolver(authSchema.registerBodyRequest),
		defaultValues: {
			email: "",
			fullName: "",
			password: "",
		},
	});

	const onSubmit = async (body: AuthOutput["registerBodyRequest"]) => {
		const formData = new FormData();
		for (const [key, value] of Object.entries(body)) {
			formData.append(key, value);
		}

		startTransition(() => {
			toast.promise(registerAction(formData), {
				loading: "Registering...",
				success: "Successfully registered!",
				error: (error: HttpError) => {
					if (error instanceof EntityError) {
						error.payload.map((message) => {
							form.setError(message.property, {
								message: message.message,
							});
						});
						return "Validation error!";
					}
					return error.message;
				},
			});
		});
	};

	return (
		<div className={"grid gap-6"}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-6"
				>
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full name</FormLabel>
								<FormControl>
									<Input placeholder="Enter your full name!" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
					<Button type="submit" className="w-full">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}

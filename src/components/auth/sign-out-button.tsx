"use client";

import { useAuthContext } from "@/app/auth/context";
import { HttpError } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SignOutButtonProps {
	children: React.ReactNode;
	redirectUrl?: string;
}

async function logoutAction() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/logout`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!res.ok) {
			throw new HttpError({
				error: data.error,
				statusCode: res.status,
				message: data.message,
			});
		}
		return data.data;
	} catch (error) {
		return error;
	}
}

export default function SignOutButton({
	children,
	redirectUrl,
}: SignOutButtonProps) {
	const router = useRouter();
	const authContext = useAuthContext();
	const performSignout = async () => {
		try {
			const data = await logoutAction();
			toast.success(data.message);
			authContext.setUser(null);
			router.push(redirectUrl || "/");
			router.refresh();
		} catch (error) {
			toast.error((error as Error).message);
		}
	};
	return (
		<div
			className="no-underline py-0"
			onClick={performSignout}
			onKeyDown={performSignout}
		>
			{children}
		</div>
	);
}

"use client";

import { useAuthContext } from "@/app/auth/context";

export default function Greeting() {
	const { user } = useAuthContext();
	if (!user) return null;

	return (
		<div>
			Hello, <span className="font-semibold">{user.fullName}</span>
		</div>
	);
}

"use client";

import { useAuthContext } from "@/app/auth/context";

interface SignedInProps {
	children: React.ReactNode;
}

export default function SignedIn({ children }: SignedInProps) {
	const { isAuthenticated } = useAuthContext();
	if (isAuthenticated) return children;

	return null;
}

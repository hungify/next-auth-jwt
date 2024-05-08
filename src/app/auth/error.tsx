"use client";

import { useEffect } from "react";

export default function AuthError({
	error,
}: {
	error: Error & { digest?: string };
}) {
	useEffect(() => {
		console.log("### :: file: error.tsx:13 :: error:", error);
	}, [error]);

	return (
		<div>
			<h2>Something went wrong!</h2>
			<p className="mt-2">{error.message}</p>
		</div>
	);
}

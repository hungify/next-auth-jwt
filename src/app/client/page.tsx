"use client";

import { useEffect, useState } from "react";

export default function ClientPage() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const getMe = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_URL}/api/proxy/auth/me`,
					{
						method: "GET",
						cache: "no-store",
					},
				);
				const data = await res.json();
				if (!res.ok) throw new Error(data.message);

				setUser(data.data);
			} catch (error) {
				return Promise.reject(error);
			}
		};
		getMe();
	}, []);
	return (
		<div>
			<h1>Client Page</h1>
			{user && <pre>{JSON.stringify(user, null, 2)}</pre>}
		</div>
	);
}

"use client";

import { useAuthContext } from "@/app/auth/context";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RefreshTokenMachine() {
	const [diff, setDiff] = useState<number | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);

	const prevAccessToken = useRef<string[]>([]);
	const router = useRouter();

	useEffect(() => {
		if (accessToken) {
			prevAccessToken.current.push(accessToken);
		}
	}, [accessToken]);

	useEffect(() => {

		console.log("Running refresh token machine");

		const getRefresh = async () => {
			{
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_URL}/api/proxy/auth/refresh-token`,
					{
						method: "GET",
					},
				);
				const { data } = await res.json();
				const { accessToken } = data;

				setAccessToken(accessToken);

				const jwtPayload = jwtDecode(accessToken);
				if (!jwtPayload.exp) {
					router.push("/logout");
					return;
				}

				const refreshTime = dayjs(jwtPayload.exp * 1000).subtract(
					55,
					"seconds",
				);
				const now = dayjs();
				const diff = refreshTime.diff(now, "milliseconds");
				console.log("Refresh token in", diff / 1000, "seconds");

				setDiff(diff);
			}
		};

		let timeoutId = null;
		if (diff !== null && diff > 0) {
			timeoutId = setTimeout(getRefresh, diff);
		} else {
			getRefresh();
		}

		return () => (timeoutId ? clearTimeout(timeoutId) : void 0);
	}, [diff, router]);

	return null;
	// return (
	// 	<div>
	// 		<div>
	// 			{diff && <p>Refreshing token in {diff / 1000} seconds</p>}
	// 			<code
	// 				style={{
	// 					whiteSpace: "pre-wrap",
	// 					wordBreak: "break-word",
	// 				}}
	// 			>
	// 				Access token: {accessToken}
	// 				<br />
	// 				Previous access tokens:
	// 				<ul>
	// 					{prevAccessToken.current.map((token, index) => (
	// 						<li key={token}>{token}</li>
	// 					))}
	// 				</ul>
	// 			</code>
	// 		</div>
	// 	</div>
	// );
}

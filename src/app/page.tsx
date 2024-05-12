import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cookies } from "next/headers";
const getMe = async () => {
	const accessToken = cookies().get("accessToken")?.value;
	const refreshToken = cookies().get("refreshToken")?.value;
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
		method: "GET",
		cache: "no-store",
		credentials: "include",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Set-Cookie": `refreshToken=${refreshToken}`,
		},
	});
	const data = await res.json();
	if (!res.ok) {
		throw new Error(data.message);
	}
	return data.data;
};

export default async function Home() {
	const data = await getMe();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Welcome to your app!</CardTitle>
				<CardDescription>
					You are logged in as
					<code className="rounded bg-muted ml-1 text-sm px-[0.3rem] py-[0.2rem]">
						<span className="font-semibold">
							{data?.fullName} ({data?.email}).
						</span>
					</code>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<pre>
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			</CardContent>
		</Card>
	);
}

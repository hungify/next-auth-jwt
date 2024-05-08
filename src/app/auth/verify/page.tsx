import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CircleCheckBig, OctagonAlert } from "lucide-react";
import Link from "next/link";
import { verifyAction } from "../_server/action";

interface VerifyProps {
	searchParams: {
		email: string;
		token: string;
	};
}

export default async function Verify({ searchParams }: VerifyProps) {
	const res = await verifyAction(searchParams.token);
	return (
		<Card>
			<CardHeader>
				<CardTitle>Verify your account</CardTitle>
				<CardDescription>
					This account will be connected to
					<code className="rounded bg-muted ml-1 	text-sm px-[0.3rem] py-[0.2rem]">
						<span className="font-semibold">{searchParams.email}</span>
					</code>
				</CardDescription>
			</CardHeader>
			<CardContent>
				{res.data ? (
					<Alert>
						<CircleCheckBig className="h-4 w-4" />
						<AlertTitle>Verification successful</AlertTitle>
						<AlertDescription>
							Your account has been verified. You can now login.
						</AlertDescription>
					</Alert>
				) : (
					<Alert variant="destructive">
						<OctagonAlert className="h-4 w-4" />
						<AlertTitle>Verification failed</AlertTitle>
						<AlertDescription>{res.error?.message}</AlertDescription>
					</Alert>
				)}
			</CardContent>
			<CardFooter>
				{res.data ? (
					<Link href="/auth/login">
						<Button variant="link" className="space-x-2">
							Login
						</Button>
					</Link>
				) : (
					<Button variant="link">Click resend verification email</Button>
				)}
			</CardFooter>
		</Card>
	);
}

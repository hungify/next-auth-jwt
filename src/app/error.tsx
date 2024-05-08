"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { OctagonAlert } from "lucide-react";

export default function AuthError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<Card className="max-w-sm mx-auto ">
			<CardHeader>
				<CardTitle>Unauthorized</CardTitle>
				<CardDescription>
					You must be logged in to access the page
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Alert variant="destructive">
					<OctagonAlert className="h-4 w-4" />
					<AlertDescription>{error?.message}</AlertDescription>
				</Alert>
			</CardContent>
		</Card>
	);
}

import SignedIn from "@/components/auth/signed-in";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignedOut from "../../components/auth/signed-out";

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
				<div
					className="absolute inset-0 bg-cover"
					style={{
						background:
							"url(https://plus.unsplash.com/premium_photo-1710800032613-6e528143e119) center center / cover no-repeat",
					}}
				/>
			</div>
			<SignedIn>
				<div className="flex items-center justify-center h-full text-center">
					<div className="space-y-6">
						<h1 className="text-4xl font-bold">Welcome back!</h1>
						<p className="text-lg">Your account is already logged in.</p>

						<Button variant="link">
							<Link href="/">Go to home</Link>
						</Button>
					</div>
				</div>
			</SignedIn>
			<SignedOut>
				<div className="lg:p-8">{children}</div>
			</SignedOut>
		</div>
	);
}

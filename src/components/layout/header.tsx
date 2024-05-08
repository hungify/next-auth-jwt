import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SunMedium } from "lucide-react";
import Link from "next/link";
import SignOutButton from "../auth/sign-out-button";
import SignedIn from "../auth/signed-in";
import SignedOut from "../auth/signed-out";
import Greeting from "../greeting";
import { Button } from "../ui/button";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<div className="mr-4 hidden md:flex">
					<Link className="mr-6 flex items-center space-x-2" href="/">
						<Avatar>
							<AvatarImage
								src="https://api.dicebear.com/8.x/shapes/svg?seed=Zoe"
								alt="Zoe"
							/>
							<AvatarFallback>Zoe</AvatarFallback>
						</Avatar>
						<span className="hidden font-bold sm:inline-block">Next Auth</span>
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<nav className="flex items-center">
						<SignedIn>
							<div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors space-x-2">
								<Greeting />
								<Avatar>
									<AvatarImage
										src="https://api.dicebear.com/8.x/adventurer/svg?seed=Sophie"
										alt="Sophie"
									/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</div>

							<SignOutButton>
								<Button variant="link" className="no-underline py-0">
									Logout
								</Button>
							</SignOutButton>
						</SignedIn>

						<Button variant="link" className="no-underline py-0">
							<SunMedium className="w-5 h-5" />
						</Button>
						<SignedOut>
							<Button variant="link" className="py-0">
								<Link href="/auth/login">Login</Link>
							</Button>

							<Button variant="link" className="py-0">
								<Link href="/auth/register">Register</Link>
							</Button>
						</SignedOut>
					</nav>
				</div>
			</div>
		</header>
	);
}

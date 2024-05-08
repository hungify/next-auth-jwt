import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import AuthProvider from "./auth/context";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "Next Auth with Cookie",
	description: "Next.js authentication with cookie",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				suppressHydrationWarning
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					inter.variable,
				)}
			>
				<Toaster richColors />
				<AuthProvider>
					<Header />
					<main className="flex-1">
						<div className="border-b">
							<main className="container py-6 mx-auto">
								<div className="mx-auto w-full min-w-0">{children}</div>
							</main>
						</div>
					</main>
				</AuthProvider>
			</body>
		</html>
	);
}

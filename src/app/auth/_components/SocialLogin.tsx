"use client";

import { Button } from "@/components/ui/button";
import { Github, Loader } from "lucide-react";
import { useState } from "react";

export default function SocialLogin() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Button variant="outline" type="button">
				{isLoading ? (
					<Loader className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Github className="mr-2 h-4 w-4" />
				)}{" "}
				GitHub
			</Button>
		</>
	);
}

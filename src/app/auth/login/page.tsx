"use client";

import LoginForm from "../_components/LoginForm";
import SocialLogin from "../_components/SocialLogin";

export default function LoginPage() {
	return (
		<>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<LoginForm />
				<SocialLogin />
			</div>
		</>
	);
}

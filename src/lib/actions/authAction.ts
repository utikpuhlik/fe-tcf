"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function signUpAction(
	email: string,
	password: string,
	first_name: string,
	last_name: string,
	turnstileToken: string,
): Promise<void> {
	const name = `${first_name} ${last_name}`;

	await auth.api.signUpEmail({
		body: {
			email,
			password,
			name,
			first_name,
			last_name,
		},
		headers: {
			"x-captcha-response": turnstileToken,
		},
	});

	redirect(`/auth/check-email?email=${encodeURIComponent(email)}`);
}

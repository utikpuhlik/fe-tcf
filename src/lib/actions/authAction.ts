"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function signUpAction(
	email: string,
	password: string,
	first_name: string,
	last_name: string,
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
	});

	redirect(`/auth/check-email?email=${encodeURIComponent(email)}`);
}

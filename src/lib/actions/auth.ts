"use server";

import { headers } from "next/headers";
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

export async function signInAction(email: string, password: string) {
	await auth.api.signInEmail({
		body: {
			email,
			password,
		},
	});

	redirect("/");
}

export async function signOutAction() {
	await auth.api.signOut({
		headers: await headers(),
	});

	redirect("/");
}

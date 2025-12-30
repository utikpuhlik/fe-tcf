import { headers } from "next/headers";
import { redirect, unauthorized } from "next/navigation";
import { auth } from "@/lib/auth";

export async function authGate() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		unauthorized();
	}
	return session;
}

export async function authGateWithRedirect() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		redirect("/auth/sign-in");
	}
	return session;
}

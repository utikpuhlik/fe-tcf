import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getAuthHeader(): Promise<HeadersInit> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		throw new Error("Missing auth token");
	}

	return {
		Authorization: `Bearer ${session.session.token}`,
	};
}

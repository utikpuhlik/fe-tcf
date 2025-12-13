import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getAuthHeader(): Promise<HeadersInit> {
	const { token } = await auth.api.getToken({
		headers: await headers(),
	});

	if (!token) {
		throw new Error("Missing auth token");
	}

	return {
		Authorization: `Bearer ${token}`,
	};
}

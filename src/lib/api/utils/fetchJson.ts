import type { ZodType } from "zod";

import { getAuthHeader } from "@/lib/api/utils/getAuthHeader";
import { handleResponse } from "@/lib/errors/handleResponse";

export async function fetchAndParse<T>(
	url: string | URL,
	schema: ZodType<T>,
): Promise<T> {
	const res = await fetch(url, {
		headers: {
			Accept: "application/json",
		},
	});

	const data = await handleResponse(res);
	return schema.parse(data);
}

export async function fetchWithAuthAndParse<T>(
	url: string | URL,
	schema: ZodType<T>,
): Promise<T> {
	const headers: HeadersInit = {
		Accept: "application/json",
		...(await getAuthHeader()),
	};

	const res = await fetch(url, {
		headers,
	});

	const data = await handleResponse(res);
	return schema.parse(data);
}

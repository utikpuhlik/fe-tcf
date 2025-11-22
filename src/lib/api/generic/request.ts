import type { ZodSchema } from "zod";

import { getAuthHeader } from "@/lib/api/utils/getAuthHeader";
import { handleResponse } from "@/lib/errors/handleResponse";

export async function apiRequest<T>(
	url: string,
	options: RequestInit,
	schema: ZodSchema<T> | null,
): Promise<T> {
	const res = await fetch(url, {
		...options,
		headers: {
			Accept: "application/json",
			...(options.body instanceof FormData
				? {}
				: { "Content-Type": "application/json" }),
			...(await getAuthHeader()),
			...(options.headers ?? {}),
		},
	});

	const data = await handleResponse(res);

	if (schema === null) {
		return undefined as unknown as T;
	}

	return schema.parse(data);
}

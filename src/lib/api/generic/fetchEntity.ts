import type { ZodSchema } from "zod";
import { env } from "@/env";
import {
	fetchAndParse,
	fetchWithAuthAndParse,
} from "@/lib/api/utils/fetchJson";

/**
 * Generic fetcher for single entity by ID.
 */
export async function fetchEntityById<T>(
	id: string,
	schema: ZodSchema<T>,
	entity: string,
	auth: boolean = false,
): Promise<T> {
	const url = `${env.NEXT_PUBLIC_API_URL}/${entity}/${id}`;
	if (auth) {
		return fetchWithAuthAndParse(url, schema);
	}
	return fetchAndParse(url, schema);
}

/**
 * Generic fetcher for single entity by Slug.
 */
export async function fetchEntityBySlug<T>(
	slug: string,
	schema: ZodSchema<T>,
	entity: string,
): Promise<T> {
	const url = `${env.NEXT_PUBLIC_API_URL}/${entity}/slug/${slug}`;
	return fetchAndParse(url, schema);
}

/**
 * Generic fetcher for entity.
 */
export async function fetchEntity<T>(
	schema: ZodSchema<T>,
	entity: string,
	auth: boolean = false,
): Promise<T> {
	const url = `${env.NEXT_PUBLIC_API_URL}/${entity}`;
	if (auth) {
		return fetchWithAuthAndParse(url, schema);
	}
	return fetchAndParse(url, schema);
}

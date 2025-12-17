import { env } from "@/env";
import {
	fetchEntity,
	fetchEntityById,
	fetchEntityBySlug,
} from "@/lib/api/generic/fetchEntity";
import { apiRequest } from "@/lib/api/generic/request";
import {
	type AddressPatchSchema,
	type AddressPostSchema,
	type AddressSchema,
	zAddressSchema,
} from "@/lib/schemas/addressSchema";

const ENTITY = "addresses";

export const addressesApi = {
	// -------------------------------
	// Fetchers
	// -------------------------------
	fetchAll(user_id: string): Promise<AddressSchema[]> {
		return fetchEntity<AddressSchema[]>(zAddressSchema.array(), ENTITY);
	},
	fetchById(id: string): Promise<AddressSchema> {
		return fetchEntityById<AddressSchema>(id, zAddressSchema, ENTITY);
	},
	fetchBySlug(slug: string): Promise<AddressSchema> {
		return fetchEntityBySlug<AddressSchema>(slug, zAddressSchema, ENTITY);
	},
	// -------------------------------
	// Post
	// -------------------------------
	post(data: AddressPostSchema): Promise<AddressSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}`;
		return apiRequest(
			url,
			{ method: "POST", body: JSON.stringify(data) },
			zAddressSchema,
		);
	},

	// -------------------------------
	// Patch
	// -------------------------------
	patch(id: string, data: AddressPatchSchema): Promise<AddressSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${id}`;
		return apiRequest(
			url,
			{ method: "PATCH", body: JSON.stringify(data) },
			zAddressSchema,
		);
	},
};

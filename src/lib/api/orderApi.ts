import { env } from "@/env";
import { fetchEntityById } from "@/lib/api/generic/fetchEntity";
import { apiRequest } from "@/lib/api/generic/request";
import { fetchWithAuthAndParse } from "@/lib/api/utils/fetchJson";
import { type CountSchema, zCountSchema } from "@/lib/schemas/commonSchema";
import {
	type OrderPaginatedSchema,
	type OrderPostSchema,
	type OrderSchema,
	type OrderWithOffersPostSchema,
	zOrderPaginatedSchema,
	zOrderSchema,
} from "@/lib/schemas/orderSchema";

const ENTITY = "orders";

export const ordersApi = {
	// -------------------------------
	// Fetchers
	// -------------------------------
	fetchByUserId(user_id: string): Promise<OrderPaginatedSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?user_id=${user_id}`;
		return fetchWithAuthAndParse(url, zOrderPaginatedSchema);
	},
	fetchById(id: string): Promise<OrderSchema> {
		return fetchEntityById<OrderSchema>(id, zOrderSchema, ENTITY, true);
	},

	fetchCount(): Promise<CountSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/meta/count`;
		return fetchWithAuthAndParse(url, zCountSchema);
	},
	// -------------------------------
	// POST Order
	// -------------------------------
	post(
		data: OrderWithOffersPostSchema | OrderPostSchema,
	): Promise<OrderSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}`;
		return apiRequest(
			url,
			{ method: "POST", body: JSON.stringify(data) },
			zOrderSchema,
		);
	},
	// -------------------------------
	// PATCH Order
	// -------------------------------
	patch(id: string, data: OrderPostSchema): Promise<OrderSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${id}`;
		return apiRequest(
			url,
			{ method: "PATCH", body: JSON.stringify(data) },
			zOrderSchema,
		);
	},
};

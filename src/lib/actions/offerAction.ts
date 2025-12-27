"use server";

import { offersApi } from "@/lib/api/offerApi";
import type { OfferSchema } from "@/lib/schemas/offerSchema";

export async function fetchOffersByIdsAction(
	ids: string[],
): Promise<OfferSchema[]> {
	if (ids.length === 0) return [];
	const data = await offersApi.fetchByIds(ids);
	return data.items;
}

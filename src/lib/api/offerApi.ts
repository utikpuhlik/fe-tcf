import { env } from "@/env";
import { fetchAndParse } from "@/lib/api/utils/fetchJson";
import { type CountSchema, zCountSchema } from "@/lib/schemas/commonSchema";
import {
	type OfferPaginatedSchema,
	zOfferPaginatedSchema,
} from "@/lib/schemas/offerSchema";

const ENTITY = "offers";

export const offersApi = {
	fetchByProductId(product_id: string): Promise<OfferPaginatedSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?product_id=${product_id}`;
		return fetchAndParse(url, zOfferPaginatedSchema);
	},
	fetchByProductSlug(product_slug: string): Promise<OfferPaginatedSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?product_slug=${product_slug}`;
		return fetchAndParse(url, zOfferPaginatedSchema);
	},
	fetchCount(
		product_id?: string,
		in_stock?: boolean,
		is_image?: boolean,
	): Promise<CountSchema> {
		const params = new URLSearchParams();
		if (product_id) params.set("product_id", product_id);
		if (in_stock !== undefined) params.set("in_stock", String(in_stock));
		if (is_image !== undefined) params.set("is_image", String(is_image));
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/meta/count?${params.toString()}`;
		return fetchAndParse(url, zCountSchema);
	},
	// -------------------------------
	// Search Types
	// -------------------------------
	fetchFilteredOffersTS(
		search_term: string,
		size = 10,
		page = 1,
	): Promise<OfferPaginatedSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/search/text_search?search_term=${search_term}&size=${size}&page=${page}`;
		return fetchAndParse(url, zOfferPaginatedSchema);
	},
	fetchFilteredOffersWS(search_term: string): Promise<OfferPaginatedSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/search/wildcard?search_term=${search_term}`;
		return fetchAndParse(url, zOfferPaginatedSchema);
	},
};

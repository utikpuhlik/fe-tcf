import type { OfferSchema } from "@/lib/schemas/offerSchema";

export function getMinPriceAndQuantity(offers: OfferSchema[]) {
	return {
		minPriceRub: offers.length
			? Math.min(...offers.map((o) => o.price_rub))
			: null,
		totalQuantity: offers.reduce((sum, o) => sum + o.quantity, 0),
	};
}

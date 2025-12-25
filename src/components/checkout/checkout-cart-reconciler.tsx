"use client";

import * as React from "react";
import { useCartStore } from "@/components/layout/cart-store-provider";
import { fetchOffersByIdsAction } from "@/lib/actions/offerAction";
import type { OfferSchema } from "@/lib/schemas/offerSchema";

type ReconciledItem = {
	offer: OfferSchema;
	quantity: number;
	hasMismatch: boolean;
};

export function CheckoutCartReconciler() {
	const items = useCartStore((state) => state.items);
	const add = useCartStore((state) => state.add);
	const clear = useCartStore((state) => state.clear);

	const hasCheckedRef = React.useRef(false);

	React.useEffect(() => {
		if (hasCheckedRef.current || items.length === 0) return;
		hasCheckedRef.current = true;

		let cancelled = false;

		const reconcile = async () => {
			try {
				const ids: string[] = items.map((item) => item.id);
				const freshOffers = await fetchOffersByIdsAction(ids);
				if (cancelled) return;

				const freshById = new Map(
					freshOffers.map((offer) => [offer.id, offer]),
				);

				const nextItems: ReconciledItem[] = [];

				for (const item of items) {
					const freshOffer = freshById.get(item.id);
					if (!freshOffer) continue;

					const stock: number = Math.max(0, freshOffer.quantity);
					if (stock <= 0) continue;

					const nextQuantity: number = Math.min(item.quantity, stock);
					const hasMismatch: boolean =
						nextQuantity !== item.quantity ||
						freshOffer.price_rub !== item.price_rub;

					nextItems.push({
						offer: freshOffer,
						quantity: nextQuantity,
						hasMismatch,
					});
				}

				clear();

				for (const next of nextItems) {
					add(
						{ ...next.offer, has_cart_mismatch: next.hasMismatch },
						next.quantity,
					);
				}
			} catch (error) {
				console.error("Checkout cart reconcile failed", error);
			}
		};

		void reconcile();

		return () => {
			cancelled = true;
		};
	}, [items, add, clear]);

	return null;
}

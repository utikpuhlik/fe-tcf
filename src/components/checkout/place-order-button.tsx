"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/components/layout/cart-store-provider";
import { Button } from "@/components/ui/button";
import { createOrderAction } from "@/lib/actions/orderAction";
import type { OfferSchema } from "@/lib/schemas/offerSchema";
import type { OrderOfferPostSchema } from "@/lib/schemas/orderOfferSchema";
import {
	type OrderWithOffersPostSchema,
	zOrderWithOffersPostSchema,
} from "@/lib/schemas/orderSchema";

export function PlaceOrderButton({
	address_id,
	items,
}: {
	address_id: string;
	items: OfferSchema[];
}) {
	const [isPending, startTransition] = useTransition();
	const clearCart = useCartStore((state) => state.clear);

	const defaultOffers: OrderOfferPostSchema[] = items.map((item) => ({
		offer_id: item.id,
		brand: item.brand,
		manufacturer_number: item.manufacturer_number,
		quantity: item.quantity,
		price_rub: item.price_rub,
	}));

	const handleCreate = () => {
		const payload: OrderWithOffersPostSchema = {
			address_id,
			status: "NEW",
			note: null,
			order_offers: defaultOffers,
		};

		const payload_validated = zOrderWithOffersPostSchema.parse(payload);

		startTransition(async () => {
			try {
				await createOrderAction(payload_validated);
				toast("Заказ оформлен", {
					description: "Наши менеджеры свяжутся с вами в ближайшее время",
				});
				clearCart();
			} catch (_error) {
				toast("Неизвестная ошибка", { description: "Что-то пошло не так.." });
			}
		});
	};

	return (
		<Button
			className="w-full"
			disabled={items.length === 0 || isPending}
			onClick={handleCreate}
		>
			Оформить заказ
		</Button>
	);
}

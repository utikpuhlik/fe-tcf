"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { useCartStore } from "@/components/layout/cart-store-provider";
import { Button } from "@/components/ui/button";
import type { OfferSchema } from "@/lib/schemas/offerSchema";

type AddToCartButtonWithQuantityProps = {
	offer: OfferSchema;
};

export function AddToCartButtonWithQuantity({
	offer,
}: AddToCartButtonWithQuantityProps) {
	const add = useCartStore((state) => state.add);

	const inCartQty: number = useCartStore(
		(state) => state.items.find((i) => i.id === offer.id)?.quantity ?? 0,
	);

	const remaining: number = Math.max(0, offer.quantity - inCartQty);
	const isDisabled: boolean = remaining <= 0;

	const [quantity, setQuantity] = React.useState<number>(1);

	// если остаток уменьшился (например, корзина/остатки обновились) — подожмём инпут
	React.useEffect(() => {
		if (isDisabled) {
			setQuantity(1);
			return;
		}

		if (quantity > remaining) {
			setQuantity(remaining);
		}
	}, [remaining, isDisabled, quantity]);

	const onAdd = () => {
		const safeQty: number = Math.min(Math.max(1, quantity), remaining);

		if (safeQty <= 0) {
			toast("Недостаточно товара на складе", {
				description: "Попробуйте уменьшить количество или обновить корзину.",
			});
			return;
		}

		// важно: store должен поддерживать add(offer, qty)
		add(offer, safeQty);

		toast("Добавлено в корзину", {
			description: `${offer.product.name} — ${offer.brand} (${safeQty} шт)`,
		});

		setQuantity(1);
	};

	return (
		<div className="flex items-center gap-2">
			<div className="flex items-center gap-1">
				<Button
					type="button"
					variant="outline"
					size="icon"
					disabled={isDisabled || quantity <= 1}
					onClick={() => setQuantity((current) => Math.max(1, current - 1))}
				>
					<Minus className="h-4 w-4" />
				</Button>
				<span className="min-w-[36px] text-center text-sm tabular-nums">
					{Math.min(quantity, Math.max(1, remaining))}
				</span>
				<Button
					type="button"
					variant="outline"
					size="icon"
					disabled={isDisabled || quantity >= Math.max(1, remaining)}
					onClick={() =>
						setQuantity((current) =>
							Math.min(Math.max(1, current + 1), Math.max(1, remaining)),
						)
					}
				>
					<Plus className="h-4 w-4" />
				</Button>
			</div>

			<Button
				type="button"
				variant="outline"
				disabled={isDisabled}
				onClick={onAdd}
			>
				<ShoppingCart className="mr-2 h-3 w-3" />
				Добавить
			</Button>
		</div>
	);
}

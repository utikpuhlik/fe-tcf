"use client";

import * as React from "react";
import { CartItem } from "@/components/cart/cart-item";
import { CartTotals } from "@/components/cart/cart-totals";
import { useCartStore } from "@/components/layout/cart-store-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartSummary() {
	const items = useCartStore((s) => s.items);

	const subtotalRub: number = React.useMemo(() => {
		return items.reduce((acc, it) => acc + it.price_rub * it.quantity, 0);
	}, [items]);

	const shippingRub: number = 0;

	return (
		<Card className="w-full max-w-none lg:w-[420px] xl:w-[460px]">
			<CardHeader>
				<CardTitle className="text-lg">Корзина</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<CartTotals subtotalRub={subtotalRub} shippingRub={shippingRub} />

				<ScrollArea className="h-72">
					<div className="space-y-3">
						{items.map((it) => (
							<CartItem key={it.id} offer={it} variant="summary" />
						))}

						{items.length === 0 ? (
							<p className="text-muted-foreground text-sm">Корзина пуста.</p>
						) : null}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}

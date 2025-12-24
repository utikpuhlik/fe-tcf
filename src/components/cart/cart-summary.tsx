"use client";

import * as React from "react";
import { CartItem } from "@/components/cart/cart-item";
import { useCartStore } from "@/components/layout/cart-store-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

export function CartSummary() {
	const items = useCartStore((s) => s.items);

	const subtotalRub: number = React.useMemo(() => {
		return items.reduce((acc, it) => acc + it.price_rub * it.quantity, 0);
	}, [items]);

	const shippingRub: number = 0;
	const totalRub: number = subtotalRub + shippingRub;

	return (
		<Card className="w-full max-w-none lg:w-[420px] xl:w-[460px]">
			<CardHeader>
				<CardTitle className="text-lg">Корзина</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="rounded-lg border p-3 text-sm">
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">Промежуточный итог</span>
						<span className="font-medium">{formatCurrency(subtotalRub)}</span>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">Доставка</span>
						<span className="font-medium">{formatCurrency(shippingRub)}</span>
					</div>

					<Separator className="my-2" />

					<div className="flex items-center justify-between">
						<span className="font-medium">Итого</span>
						<span className="font-semibold">{formatCurrency(totalRub)}</span>
					</div>
				</div>

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

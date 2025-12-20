"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

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
							<div
								key={it.id}
								className="flex items-start justify-between gap-3 rounded-lg border p-3"
							>
								<div className="flex min-w-0 items-start gap-3">
									<Link
										href={`/catalog/${it.product.slug}`}
										className="relative mt-0.5 h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
										aria-label={`Открыть ${it.product.name}`}
									>
										<Image
											src={it.image_url}
											alt={it.product.name}
											fill
											sizes="48px"
											className="object-cover"
										/>
									</Link>

									<div className="min-w-0">
										<Link
											href={`/catalog/${it.product.slug}`}
											className="truncate font-medium text-sm hover:underline"
										>
											{it.product.name}
										</Link>
										<div className="text-muted-foreground text-xs">
											Производитель: {it.brand}
										</div>
										<div className="text-muted-foreground text-xs">
											{it.quantity} x {formatCurrency(it.price_rub)}
										</div>
									</div>
								</div>

								<div className="shrink-0 font-medium text-sm">
									{formatCurrency(it.price_rub * it.quantity)}
								</div>
							</div>
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

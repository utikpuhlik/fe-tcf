"use client";

import Image from "next/image";
import { AddToCartButtonWithQuantity } from "@/components/cart/add-to-cart-button";
import { Card } from "@/components/ui/card";
import type { OfferSchema } from "@/lib/schemas/offerSchema";
import { cn } from "@/lib/utils";

interface OffersListProps {
	offers: OfferSchema[];
	className?: string;
}

export function OffersList({ offers, className }: OffersListProps) {
	return (
		<section
			className={cn(
				"flex flex-col divide-y divide-border rounded-none border border-border",
				className,
			)}
		>
			{offers.map((offer) => (
				<Card
					key={offer.id}
					className="flex flex-row items-center gap-4 rounded-none border-0 px-4 py-4 transition-colors hover:bg-muted/40"
				>
					{/* IMAGE */}
					<div className="relative h-16 w-16 shrink-0">
						<Image
							src={offer.image_url}
							alt={offer.product.name}
							fill
							sizes="64px"
							className="object-contain"
						/>
					</div>

					{/* MAIN INFO */}
					<div className="flex min-w-0 flex-1 flex-col leading-tight">
						<span className="truncate font-medium text-sm">
							{offer.product.name}
						</span>

						<span className="text-muted-foreground text-xs">
							Производитель: {offer.brand}
						</span>

						<span className="text-muted-foreground text-xs">
							Артикул: {offer.manufacturer_number}
						</span>
					</div>

					{/* PRICE + STOCK */}
					<div className="flex flex-col items-end justify-center whitespace-nowrap">
						<span className="font-semibold text-base text-primary">
							{offer.price_rub} ₽
						</span>

						<span
							className={
								offer.quantity > 0
									? "text-green-600 text-xs"
									: "text-red-500 text-xs"
							}
						>
							{offer.quantity > 0
								? `В наличии: ${offer.quantity}`
								: "Нет в наличии"}
						</span>
					</div>

					{/* ADD TO CART */}
					<div className="ml-4">
						<AddToCartButtonWithQuantity offer={offer} />
					</div>
				</Card>
			))}
		</section>
	);
}

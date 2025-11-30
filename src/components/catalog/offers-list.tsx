"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
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
				"flex flex-col border border-border rounded-none divide-y divide-border",
				className,
			)}
		>
			{offers.map((offer) => (
				<Card
					key={offer.id}
					className="
            flex flex-row items-center gap-4
            border-0 rounded-none px-4 py-4
            hover:bg-muted/40 transition-colors
          "
				>
					{/* IMAGE */}
					<div className="relative h-16 w-16 flex-shrink-0">
						<Image
							src={offer.image_url}
							alt={offer.product.name}
							fill
							sizes="64px"
							className="object-contain"
						/>
					</div>

					{/* MAIN INFO */}
					<div className="flex flex-col flex-1 min-w-0 leading-tight">
						<span className="font-medium text-sm truncate">
							{offer.product.name}
						</span>

						<span className="text-xs text-muted-foreground">
							Производитель: {offer.brand}
						</span>

						<span className="text-xs text-muted-foreground">
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
									? "text-xs text-green-600"
									: "text-xs text-red-500"
							}
						>
							{offer.quantity > 0
								? `В наличии: ${offer.quantity}`
								: "Нет в наличии"}
						</span>
					</div>

					{/* ADD TO CART */}
					<div className="ml-4">
						<Button size="sm" variant="default">
							В корзину
						</Button>
					</div>
				</Card>
			))}
		</section>
	);
}

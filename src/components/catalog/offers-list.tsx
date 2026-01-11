"use client";

import Image from "next/image";
import { AddToCartButtonWithQuantity } from "@/components/cart/add-to-cart-button";
import { StockBadge } from "@/components/catalog/stock-badge";
import { Card } from "@/components/ui/card";
import type { OfferSchema } from "@/lib/schemas/offerSchema";
import { cn, formatCurrency } from "@/lib/utils";

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
					<div className="flex min-w-0 flex-1 flex-col items-start leading-tight">
						<span className="truncate font-medium text-sm">
							{offer.product.name}
						</span>

						<span className="text-muted-foreground text-xs [&_strong]:font-semibold [&_strong]:text-foreground">
							Производитель: <strong>{offer.brand}</strong>
						</span>

						<span className="mb-1 text-muted-foreground text-xs [&_strong]:font-semibold [&_strong]:text-foreground">
							Артикул: <strong>{offer.manufacturer_number}</strong>
						</span>
						<StockBadge quantity={offer.quantity} />
					</div>

					<span className="font-semibold text-base text-primary">
						{formatCurrency(offer.price_rub)}
					</span>

					{/* ADD TO CART */}
					<div className="ml-4">
						<AddToCartButtonWithQuantity offer={offer} />
					</div>
				</Card>
			))}
		</section>
	);
}

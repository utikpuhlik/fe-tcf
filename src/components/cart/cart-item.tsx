import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SheetClose } from "@/components/ui/sheet";
import type { CartItem as CartItemType } from "@/lib/stores/useCartStore";
import { buildCatalogPath, formatCurrency } from "@/lib/utils";

type CartItemProps = {
	offer: CartItemType;
	variant?: "summary" | "sheet";
	onIncrement?: (id: string) => void;
	onDecrement?: (id: string) => void;
	onRemove?: (id: string) => void;
};

export function CartItem({
	offer,
	variant = "sheet",
	onIncrement,
	onDecrement,
	onRemove,
}: CartItemProps) {
	const isAtStockLimit =
		typeof offer.stock_quantity === "number" &&
		offer.stock_quantity > 0 &&
		offer.quantity >= offer.stock_quantity;

	if (variant === "summary") {
		return (
			<div className="flex items-stretch justify-between gap-3 rounded-lg border p-3">
				<div className="flex min-w-0 items-start gap-3">
					<Link
						href={buildCatalogPath(offer)}
						className="relative mt-0.5 h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
						aria-label={`Открыть ${offer.product.name}`}
					>
						<Image
							src={offer.image_url}
							alt={offer.product.name}
							fill
							sizes="48px"
							className="object-cover"
						/>
					</Link>

					<div className="min-w-0">
						<Link
							href={buildCatalogPath(offer)}
							className="font-medium text-sm hover:underline"
						>
							{offer.product.name}
						</Link>
						<div className="text-muted-foreground text-xs">
							Производитель: {offer.brand}
						</div>
						<div className="text-muted-foreground text-xs">
							{offer.quantity} x {formatCurrency(offer.price_rub)}
						</div>
						{offer.has_cart_mismatch ? (
							<div className="pt-1 text-amber-600 text-xs">
								Цена или количество изменено
							</div>
						) : null}
						<div className="pt-1 font-medium text-sm">
							{formatCurrency(offer.price_rub * offer.quantity)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Card key={offer.id} className="overflow-hidden p-0">
			<CardContent className="p-0">
				<div className="flex">
					{/* Product Image */}
					<div className="relative h-auto w-28 shrink-0">
						<SheetClose asChild>
							<Link href={buildCatalogPath(offer)}>
								<Image
									src={offer.image_url}
									alt={offer.product.name}
									fill
									className="object-cover"
									sizes="96px"
								/>
							</Link>
						</SheetClose>
					</div>

					{/* Product Details */}
					<div className="flex-1 p-4">
						<div className="flex justify-between">
							<div>
								<h3 className="font-medium text-sm hover:underline">
									<SheetClose asChild>
										<Link href={buildCatalogPath(offer)}>
											{offer.product.name}
										</Link>
									</SheetClose>
								</h3>
								<p className="text-muted-foreground text-xs">
									<Link href={buildCatalogPath(offer.product.sub_category)}>
										{offer.product.sub_category.name}
									</Link>
								</p>
								<p className="text-muted-foreground text-xs">
									{offer.brand} • {offer.manufacturer_number}
								</p>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7"
								onClick={() => onRemove?.(offer.id)}
								disabled={!onRemove}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>

						<div className="mt-2 flex items-center justify-between">
							<div className="flex items-center gap-1">
								<Button
									variant="outline"
									size="icon"
									className="h-7 w-7"
									onClick={() => onDecrement?.(offer.id)}
									disabled={!onDecrement}
								>
									<Minus className="h-3 w-3" />
								</Button>
								<span className="w-6 text-center text-sm">
									{offer.quantity}
								</span>
								<Button
									variant="outline"
									size="icon"
									className="h-7 w-7"
									onClick={() => onIncrement?.(offer.id)}
									disabled={!onIncrement || isAtStockLimit}
								>
									<Plus className="h-3 w-3" />
								</Button>
							</div>

							<div className="text-right">
								<div className="font-medium text-sm">
									{formatCurrency(offer.price_rub * offer.quantity)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

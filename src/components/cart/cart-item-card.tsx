import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { OfferSchema } from "@/lib/schemas/offerSchema";
import { formatCurrency } from "@/lib/utils";

type CartItemCardProps = {
	offer: OfferSchema;
	onIncrement: (id: string) => void;
	onDecrement: (id: string) => void;
	onRemove: (id: string) => void;
};

export function CartItemCard({
	offer,
	onIncrement,
	onDecrement,
	onRemove,
}: CartItemCardProps) {
	return (
		<Card key={offer.id} className="overflow-hidden p-0">
			<CardContent className="p-0">
				<div className="flex">
					{/* Product Image */}
					<div className="relative h-auto w-28 flex-shrink-0">
						<Link
							href={`/catalog/${offer.product.sub_category.category.slug}/${offer.product.sub_category.slug}/${offer.product.slug}`}
						>
							<Image
								src={offer.image_url}
								alt={offer.product.name}
								fill
								className="object-cover"
								sizes="96px"
							/>
						</Link>
					</div>

					{/* Product Details */}
					<div className="flex-1 p-4">
						<div className="flex justify-between">
							<div>
								<h3 className="font-medium text-sm">
									<Link
										href={`/catalog/${offer.product.sub_category.category.slug}/${offer.product.sub_category.slug}/${offer.product.slug}`}
									>
										{offer.product.name}
									</Link>
								</h3>
								<p className="text-muted-foreground text-xs">
									<Link
										href={`/catalog/${offer.product.sub_category.category.slug}/${offer.product.sub_category.slug}`}
									>
										{offer.product.sub_category.name}
									</Link>
								</p>
								<p className="text-muted-foreground text-xs">
									{offer.brand} • {offer.manufacturer_number}
								</p>
							</div>
							<Button
								variant="outline"
								size="icon"
								className="h-7 w-7"
								onClick={() => onRemove(offer.id)}
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
									onClick={() => onDecrement(offer.id)}
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
									onClick={() => onIncrement(offer.id)}
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

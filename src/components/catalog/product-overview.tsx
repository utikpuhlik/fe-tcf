import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductSchema } from "@/lib/schemas/productSchema";
import { cn, formatCurrency } from "@/lib/utils";

interface ProductOverviewProps {
	product: ProductSchema;
	minPriceRub: number | null;
	totalQuantity: number | null;
}

export default function ProductOverview({
	product,
	minPriceRub,
	totalQuantity,
}: ProductOverviewProps) {
	const qty = totalQuantity ?? 0;
	const inStock = qty > 0;

	const priceLabel =
		minPriceRub == null
			? "цена не указана"
			: `от: ${formatCurrency(minPriceRub)}`;

	return (
		<Card className="w-full">
			<CardContent className="flex gap-4 p-4">
				<div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
					<Image
						src={product.image_url}
						alt={product.name}
						fill
						className="object-cover"
						sizes="96px"
					/>
				</div>

				<div className="min-w-0 flex-1 space-y-1">
					<h1 className="truncate font-semibold text-lg">{product.name}</h1>

					<p className="text-muted-foreground text-sm">
						Кросс-номер: {product.cross_number ?? "Not specified"}
					</p>

					<p className="font-medium text-sm">{priceLabel}</p>

					<div className="flex items-center gap-2">
						<span
							className={cn(
								"h-2.5 w-2.5 rounded-full",
								inStock ? "bg-emerald-500" : "bg-rose-500",
							)}
							aria-hidden
						/>
						<Badge
							variant={inStock ? "secondary" : "destructive"}
							className="font-normal"
						>
							{inStock ? `в наличии: ${qty}` : "нет в наличии"}
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

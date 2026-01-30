import Image from "next/image";
import { StockBadge } from "@/components/catalog/stock-badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductSchema } from "@/lib/schemas/productSchema";
import { formatCurrency } from "@/lib/utils";

interface ProductOverviewProps {
	product: ProductSchema;
}

export default function ProductOverview({ product }: ProductOverviewProps) {
	const priceLabel =
		product.min_price_rub == null
			? "цена не указана"
			: `от: ${formatCurrency(product.min_price_rub)}`;

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
					<h1 className="font-semibold text-lg">{product.name}</h1>

					<p className="text-muted-foreground text-sm">
						Кросс-номер: {product.cross_number ?? "отсутствует"}
					</p>

					<p className="font-medium text-sm">{priceLabel}</p>

					<div className="flex items-center gap-2">
						<StockBadge quantity={product.total_quantity} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

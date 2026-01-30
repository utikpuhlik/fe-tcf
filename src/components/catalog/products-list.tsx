"use client";

import Image from "next/image";
import Link from "next/link";
import { StockBadge } from "@/components/catalog/stock-badge";
import { Card } from "@/components/ui/card";
import type { ProductSchema } from "@/lib/schemas/productSchema";
import { cn, formatCurrency } from "@/lib/utils";

interface ProductsListProps {
	products: ProductSchema[];
	categorySlug: string;
	subCategorySlug: string;
	className?: string;
}

export function ProductsList({
	products,
	categorySlug,
	subCategorySlug,
	className,
}: ProductsListProps) {
	return (
		<section
			className={cn(
				"flex flex-col divide-y divide-border rounded-none border border-border",
				className,
			)}
		>
			{products.map((product) => {
				const href = `/catalog/ford/${categorySlug}/${subCategorySlug}/${product.slug}`;
				return (
					<Link key={product.id} href={href} className="block">
						<Card className="flex flex-row items-center gap-4 rounded-none border-0 px-4 py-4 transition-colors hover:bg-muted/40">
							<div className="relative h-16 w-16 shrink-0">
								<Image
									src={product.image_url}
									alt={product.name}
									fill
									className="object-contain"
									sizes="64px"
								/>
							</div>

							<div className="flex min-w-0 flex-1 flex-col items-start leading-tight">
								<span className="font-medium text-sm">{product.name}</span>

								<span className="text-muted-foreground text-xs">
									Кросс-номер: {product.cross_number ?? "отсутствует"}
								</span>

								<span className="text-sm">
									{product.min_price_rub == null
										? "цена не указана"
										: `от ${formatCurrency(product.min_price_rub)}`}
								</span>

								<div className="mt-1 flex items-center gap-2">
									<StockBadge quantity={product.total_quantity} />
								</div>
							</div>
						</Card>
					</Link>
				);
			})}
		</section>
	);
}

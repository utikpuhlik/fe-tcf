"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { ProductSchema } from "@/lib/schemas/productSchema";
import { cn } from "@/lib/utils";

interface ProductsListProps {
	products: ProductSchema[];
	className?: string;
}

export function ProductsList({ products, className }: ProductsListProps) {
	return (
		<section
			className={cn(
				"flex flex-col divide-y divide-border rounded-none border border-border",
				className,
			)}
		>
			{products.map((product) => (
				<Link
					key={product.id}
					href={`/catalog/ford/${product.sub_category.category.slug}/${product.sub_category.slug}/${product.slug}`}
					className="block"
				>
					<Card className="flex flex-row items-center gap-4 rounded-none border-0 px-4 py-4 transition-colors hover:bg-muted/40">
						{/* IMAGE */}
						<div className="relative h-16 w-16 flex-shrink-0">
							<Image
								src={product.image_url}
								alt={product.name}
								fill
								className="object-contain"
								sizes="64px"
							/>
						</div>

						{/* INFO */}
						<div className="flex min-w-0 flex-1 flex-col leading-tight">
							<span className="truncate font-medium text-sm">
								{product.name}
							</span>

							{product.cross_number && (
								<span className="truncate text-muted-foreground text-xs">
									Кросс-номер: {product.cross_number}
								</span>
							)}
						</div>
					</Card>
				</Link>
			))}
		</section>
	);
}

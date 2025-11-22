"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { SubCategorySchema } from "@/lib/schemas/subCategorySchema";
import { cn } from "@/lib/utils";

type SubCategoriesGridProps = {
	categories: (SubCategorySchema & { products_count: number })[];
	className?: string;
};

export function SubCategoriesGrid({
	categories,
	className,
}: SubCategoriesGridProps) {
	return (
		<section
			className={cn(
				"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5", // плотная сетка
				"border border-border", // рамка вокруг всей плитки
				className,
			)}
		>
			{categories.map((category) => (
				<Link
					key={category.id}
					href={`/src/app/catalog/${category.slug}`}
					className="block"
				>
					<Card
						className="
              flex flex-row items-center gap-4
              border border-border border-t-0 border-l-0
              rounded-none px-4 py-3
              hover:bg-muted/40 transition-colors
              h-[70px]   /* низкий прямоугольник */
            "
					>
						{/* LEFT IMG */}
						<div className="relative h-10 w-10 flex-shrink-0">
							<Image
								src={category.image_url}
								alt={category.name}
								fill
								className="object-contain"
								sizes="40px"
							/>
						</div>

						{/* TEXT */}
						<div className="flex flex-col items-start justify-center leading-tight">
							<span className="text-sm font-medium group-hover:text-primary">
								{category.name}
							</span>

							<span className="text-xs text-muted-foreground">
								{category.products_count} товаров
							</span>
						</div>
					</Card>
				</Link>
			))}
		</section>
	);
}

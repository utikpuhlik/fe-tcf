"use client";

import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import type { CategorySchema } from "@/lib/schemas/categorySchema";
import { cn } from "@/lib/utils";

type CategoriesGridProps = {
	categories: (CategorySchema & { products_count: number })[];
	className?: string;
};

export function CategoriesGrid({ categories, className }: CategoriesGridProps) {
	return (
		<section
			className={cn(
				// 👉 плотная плитка без пробелов
				"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
				className,
			)}
			style={{
				margin: 0,
			}}
		>
			{categories.map((category) => (
				<Link
					key={category.id}
					href={`/catalog/ford/${category.slug}`}
					className="block"
				>
					<Card
						className="
              flex flex-row items-center gap-4
              border rounded-none
              px-4 py-3
              hover:bg-muted/40 transition-colors
            "
					>
						{/* LEFT IMAGE */}
						<div className="relative h-12 w-12 flex-shrink-0">
							<Image
								src={category.image_url}
								alt={category.name}
								fill
								sizes="48px"
								className="object-contain"
							/>
						</div>

						{/* TEXT RIGHT */}
						<div className="flex flex-col justify-center items-start">
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

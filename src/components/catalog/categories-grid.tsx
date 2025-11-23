"use client";

import { TileGrid } from "@/components/catalog/tile-grid";
import type { CategorySchema } from "@/lib/schemas/categorySchema";

interface CategoriesGridProps {
	categories: CategorySchema[];
	facets: Record<string, number>;
	className?: string;
}

export function CategoriesGrid({
	categories,
	facets,
	className,
}: CategoriesGridProps) {
	return (
		<TileGrid
			items={categories}
			facets={facets}
			className={className}
			makeHref={(c) => `/catalog/ford/${c.slug}`}
		/>
	);
}

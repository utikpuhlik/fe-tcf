"use client";

import { TileGrid } from "@/components/catalog/tile-grid";
import type { SubCategorySchema } from "@/lib/schemas/subCategorySchema";

interface SubCategoriesGridProps {
	categories: SubCategorySchema[];
	facets: Record<string, number>;
	className?: string;
}

export function SubCategoriesGrid({
	categories,
	facets,
	className,
}: SubCategoriesGridProps) {
	return (
		<TileGrid
			items={categories}
			facets={facets}
			className={className}
			makeHref={(c) => `/catalog/ford/${c.slug}`}
		/>
	);
}

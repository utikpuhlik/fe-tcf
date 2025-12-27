"use client";

import { TileGrid } from "@/components/catalog/tile-grid";
import type { SubCategorySchema } from "@/lib/schemas/subCategorySchema";
import { buildCatalogPath } from "@/lib/utils";

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
			makeHref={(c) => buildCatalogPath(c)}
		/>
	);
}

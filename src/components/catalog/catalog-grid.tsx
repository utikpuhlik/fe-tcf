"use client";

import { TileGrid } from "@/components/catalog/tile-grid";
import type { CategorySchema } from "@/lib/schemas/categorySchema";
import type { SubCategorySchema } from "@/lib/schemas/subCategorySchema";
import { buildCatalogPath } from "@/lib/utils";

interface CatalogGridProps {
	categories: CategorySchema[] | SubCategorySchema[];
	facets: Record<string, number>;
	className?: string;
}

export function CatalogGrid({
	categories,
	facets,
	className,
}: CatalogGridProps) {
	return (
		<TileGrid
			items={categories}
			facets={facets}
			className={className}
			makeHref={(c) => buildCatalogPath(c)}
		/>
	);
}

import type { Metadata } from "next";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { categoriesApi } from "@/lib/api/categoryApi";
import { productsApi } from "@/lib/api/productApi";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
	return generateMeta({
		title: "Каталог",
		description: "Каталог автозапчастей Ford",
		canonical: "/catalog/ford",
	});
}

export default async function CataloguePage() {
	const [data, facets] = await Promise.all([
		categoriesApi.fetchAll(),
		productsApi.fetchFacetsPerCategory(),
	]);

	return (
		<main className="space-y-4">
			<h1 className="font-semibold text-xl tracking-tight lg:text-2xl">
				Каталог
			</h1>

			<CatalogGrid categories={data.items} facets={facets} />
		</main>
	);
}

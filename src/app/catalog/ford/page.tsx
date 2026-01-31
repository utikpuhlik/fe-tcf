import type { Metadata } from "next";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { categoriesApi } from "@/lib/api/categoryApi";
import { productsApi } from "@/lib/api/productApi";
import { buildCatalogPath, generateMeta } from "@/lib/utils";

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

	const breadcrumbs = [{ label: "Каталог", href: buildCatalogPath() }];

	return (
		<main className="space-y-4">
			<h1 className="font-semibold text-xl tracking-tight sm:text-2xl lg:text-3xl">
				{/*<h1 className="font-semibold tracking-tight text-xl sm:text-2xl lg:text-3xl">*/}
				Каталог автозапчастей Ford
			</h1>
			<Breadcrumbs breadcrumbs={breadcrumbs} />
			<CatalogGrid categories={data.items} facets={facets} />
		</main>
	);
}

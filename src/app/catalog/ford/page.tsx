import { CategoriesGrid } from "@/components/catalog/categories-grid";
import { categoriesApi } from "@/lib/api/categoryApi";
import { productsApi } from "@/lib/api/productApi";

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

			<CategoriesGrid categories={data.items} facets={facets} />
		</main>
	);
}

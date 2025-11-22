import { CategoriesGrid } from "@/components/catalog/categories-grid";
import { categoriesApi } from "@/lib/api/categoryApi";
import { productsApi } from "@/lib/api/productApi";
import type { CategorySchema } from "@/lib/schemas/categorySchema";

export default async function CataloguePage() {
	const [data, facets] = await Promise.all([
		categoriesApi.fetchAll(),
		productsApi.fetchFacetsPerCategory(),
	]);

	const categories: (CategorySchema & { products_count: number })[] =
		data.items.map((category) => ({
			...category,
			products_count: facets[category.name] ?? 0,
		}));

	return (
		<main className="space-y-4">
			<h1 className="text-xl font-semibold tracking-tight lg:text-2xl">
				Каталог
			</h1>

			<CategoriesGrid categories={categories} />
		</main>
	);
}

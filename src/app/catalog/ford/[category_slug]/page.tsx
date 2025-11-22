import { SubCategoriesGrid } from "@/components/catalog/sub-categories-grid";
import { categoriesApi } from "@/lib/api/categoryApi";
import { productsApi } from "@/lib/api/productApi";
import { subCategoriesApi } from "@/lib/api/subCategoryApi";

type Props = {
	params: Promise<{ category_slug: string }>;
};

export default async function SubCategoriesPage({ params }: Props) {
	const { category_slug } = await params;

	// 1. Находим категорию по slug
	const category = await categoriesApi.fetchBySlug(category_slug);

	// 2. Фетчим subcategories + facets
	const [data, facets] = await Promise.all([
		subCategoriesApi.fetchByCategoryId(category.id),
		productsApi.fetchFacetsPerSubCategory(category.id),
	]);

	// 3. Мерджим counts
	const subCategories = data.items.map((subcat) => ({
		...subcat,
		products_count: facets[subcat.name] ?? 0,
	}));

	return (
		<main className="space-y-4">
			<h1 className="text-xl font-semibold tracking-tight lg:text-2xl">
				{category.name}
			</h1>

			<SubCategoriesGrid categories={subCategories} />
		</main>
	);
}

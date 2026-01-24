import type { Metadata } from "next";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { categoriesApi } from "@/lib/api/categoryApi";
import { productsApi } from "@/lib/api/productApi";
import { subCategoriesApi } from "@/lib/api/subCategoryApi";
import { buildCatalogPath, generateMeta } from "@/lib/utils";

interface Props {
	params: Promise<{ category_slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { category_slug } = await params;
	const data = await categoriesApi.fetchBySlug(category_slug);
	return generateMeta({
		title: data.name,
		description: `Продажа автозапчастей Ford с доставкой по России | ${data.name}`,
		canonical: buildCatalogPath(data),
		og_image: data.image_url,
	});
}

export default async function SubCategoriesPage({ params }: Props) {
	const { category_slug } = await params;

	const category = await categoriesApi.fetchBySlug(category_slug);

	const [data, facets] = await Promise.all([
		subCategoriesApi.fetchByCategoryId(category.id),
		productsApi.fetchFacetsPerSubCategory(category.id),
	]);

	return (
		<main className="space-y-4">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Каталог", href: buildCatalogPath() },
					{
						label: category.name,
						href: buildCatalogPath(category),
						active: true,
					},
				]}
			/>

			<CatalogGrid categories={data.items} facets={facets} />
		</main>
	);
}

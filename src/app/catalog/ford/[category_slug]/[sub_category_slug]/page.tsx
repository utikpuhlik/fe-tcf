import type { Metadata } from "next";
import { ProductsList } from "@/components/catalog/products-list";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { productsApi } from "@/lib/api/productApi";
import { subCategoriesApi } from "@/lib/api/subCategoryApi";
import { buildCatalogPath, generateMeta } from "@/lib/utils";

interface Props {
	params: Promise<{ sub_category_slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { sub_category_slug } = await params;
	const data = await subCategoriesApi.fetchBySlug(sub_category_slug);
	return generateMeta({
		title: data.name,
		description: `Продажа автозапчастей Ford с доставкой по России | ${data.name}`,
		og_image: data.image_url,
	});
}

export default async function ProductsPage({ params }: Props) {
	const { sub_category_slug } = await params;

	const [sub_category, products] = await Promise.all([
		await subCategoriesApi.fetchBySlug(sub_category_slug),
		await productsApi.fetchStatsBySubCategorySlug(sub_category_slug),
	]);

	return (
		<main className="space-y-4">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Каталог", href: buildCatalogPath() },
					{
						label: sub_category.category.name,
						href: buildCatalogPath(sub_category.category),
					},
					{
						label: sub_category.name,
						href: buildCatalogPath(sub_category),
						active: true,
					},
				]}
			/>

			<ProductsList
				products={products}
				categorySlug={sub_category.category.slug}
				subCategorySlug={sub_category_slug}
			/>
		</main>
	);
}

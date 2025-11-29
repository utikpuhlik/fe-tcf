import Breadcrumbs from "@/components/shared/breadcrumbs";
import { productsApi } from "@/lib/api/productApi";
import { subCategoriesApi } from "@/lib/api/subCategoryApi";
import type { ProductPaginatedSchema } from "@/lib/schemas/productSchema";

interface Props {
	params: Promise<{ sub_category_slug: string }>;
}

export default async function ProductsPage({ params }: Props) {
	const { sub_category_slug } = await params;

	const sub_category = await subCategoriesApi.fetchBySlug(sub_category_slug);

	const _productsData: ProductPaginatedSchema =
		await productsApi.fetchBySubCategoryId(sub_category.id);

	return (
		<main className="space-y-4">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Каталог", href: "/catalog/ford" },
					{
						label: sub_category.category.name,
						href: `/catalog/ford/${sub_category.category.slug}`,
						active: true,
					},
					{
						label: sub_category.name,
						href: `/catalog/${sub_category.category.slug}/${sub_category_slug}`,
						active: true,
					},
				]}
			/>

			{/*<SubCategoriesGrid categories={products.items} facets={facets} />*/}
		</main>
	);
}

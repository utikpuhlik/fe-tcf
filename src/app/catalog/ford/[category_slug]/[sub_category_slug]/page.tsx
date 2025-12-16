import { ProductsList } from "@/components/catalog/products-list";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { productsApi } from "@/lib/api/productApi";
import { subCategoriesApi } from "@/lib/api/subCategoryApi";

interface Props {
	params: Promise<{ sub_category_slug: string }>;
}

export default async function ProductsPage({ params }: Props) {
	const { sub_category_slug } = await params;

	const [sub_category, productsData] = await Promise.all([
		await subCategoriesApi.fetchBySlug(sub_category_slug),
		await productsApi.fetchBySubCategorySlug(sub_category_slug),
	]);

	return (
		<main className="space-y-4">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Каталог", href: "/catalog/ford" },
					{
						label: sub_category.category.name,
						href: `/catalog/ford/${sub_category.category.slug}`,
					},
					{
						label: sub_category.name,
						href: `/catalog/ford/${sub_category.category.slug}/${sub_category_slug}`,
						active: true,
					},
				]}
			/>

			<ProductsList products={productsData.items} />
		</main>
	);
}

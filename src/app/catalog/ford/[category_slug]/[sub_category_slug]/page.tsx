import type { Metadata } from "next";
import Script from "next/script";
import { ProductsList } from "@/components/catalog/products-list";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { productsApi } from "@/lib/api/productApi";
import { subCategoriesApi } from "@/lib/api/subCategoryApi";
import { buildCatalogPath, generateMeta } from "@/lib/utils";
import { generateBreadcrumbs } from "@/lib/utils/schemaGenerator";

interface Props {
	params: Promise<{ sub_category_slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { sub_category_slug } = await params;
	const data = await subCategoriesApi.fetchBySlug(sub_category_slug);
	return generateMeta({
		title: data.name,
		description: `Продажа автозапчастей Ford с доставкой по России | ${data.name}`,
		canonical: buildCatalogPath(data),
		og_image: data.image_url,
	});
}

export default async function ProductsPage({ params }: Props) {
	const { sub_category_slug } = await params;

	const [sub_category, products] = await Promise.all([
		await subCategoriesApi.fetchBySlug(sub_category_slug),
		await productsApi.fetchBySubCategorySlug(sub_category_slug),
	]);

	const breadcrumbs = [
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
	];

	const breadcrumbsJsonLd = generateBreadcrumbs(breadcrumbs);

	return (
		<>
			<Script id="breadcrumbs-jsonld" type="application/ld+json">
				{JSON.stringify(breadcrumbsJsonLd).replace(/</g, "\\u003c")}
			</Script>
			<main className="space-y-4">
				<h1 className="font-semibold text-xl tracking-tight sm:text-2xl lg:text-3xl">
					{sub_category.name}
				</h1>
				<Breadcrumbs breadcrumbs={breadcrumbs} />
				<ProductsList
					products={products.items}
					categorySlug={sub_category.category.slug}
					subCategorySlug={sub_category_slug}
				/>
			</main>
		</>
	);
}

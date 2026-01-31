import type { Metadata } from "next";
import Script from "next/script";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { categoriesApi } from "@/lib/api/categoryApi";
import { productsApi } from "@/lib/api/productApi";
import { subCategoriesApi } from "@/lib/api/subCategoryApi";
import { buildCatalogPath, generateMeta } from "@/lib/utils";
import { generateBreadcrumbs } from "@/lib/utils/schemaGenerator";

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

	const breadcrumbs = [
		{ label: "Каталог", href: buildCatalogPath() },
		{ label: category.name, href: buildCatalogPath(category), active: true },
	];

	const breadcrumbsJsonLd = generateBreadcrumbs(breadcrumbs);

	return (
		<>
			<Script id="breadcrumbs-jsonld" type="application/ld+json">
				{JSON.stringify(breadcrumbsJsonLd).replace(/</g, "\\u003c")}
			</Script>
			<main className="space-y-4">
				<h1 className="font-semibold text-xl tracking-tight sm:text-2xl lg:text-3xl">
					{category.name}
				</h1>
				<Breadcrumbs breadcrumbs={breadcrumbs} />
				{/*TODO: catalogGrid doesnt match width with product-list*/}
				<CatalogGrid categories={data.items} facets={facets} />
			</main>
		</>
	);
}

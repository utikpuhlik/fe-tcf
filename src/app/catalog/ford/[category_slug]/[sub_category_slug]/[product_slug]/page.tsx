import type { Metadata } from "next";
import Script from "next/script";
import { OffersList } from "@/components/catalog/offers-list";
import ProductOverview from "@/components/catalog/product-overview";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { offersApi } from "@/lib/api/offerApi";
import { productsApi } from "@/lib/api/productApi";
import { buildCatalogPath, generateMeta } from "@/lib/utils";
import {
	generateBreadcrumbs,
	generateProductSchemaLD,
} from "@/lib/utils/schemaGenerator";

interface Props {
	params: Promise<{ product_slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { product_slug } = await params;
	const data = await productsApi.fetchBySlug(product_slug);
	return generateMeta({
		title: data.name,
		description: `Приобрести ${data.name.toLowerCase()} | Продажа автозапчастей Ford с доставкой по России`,
		canonical: buildCatalogPath(data),
	});
}

export default async function OffersPage({ params }: Props) {
	const { product_slug } = await params;

	const [product, offersPage] = await Promise.all([
		productsApi.fetchBySlug(product_slug),
		offersApi.fetchByProductSlug(product_slug),
	]);
	const breadcrumbs = [
		{ label: "Каталог", href: buildCatalogPath() },
		{
			label: product.sub_category.category.name,
			href: buildCatalogPath(product.sub_category.category),
		},
		{
			label: product.sub_category.name,
			href: buildCatalogPath(product.sub_category),
		},
		{ label: product.name, href: buildCatalogPath(product), active: true },
	];

	const breadcrumbsJsonLd = generateBreadcrumbs(breadcrumbs);
	const jsonLd = generateProductSchemaLD(product, offersPage.items);

	return (
		<>
			<Script id="product-jsonld" type="application/ld+json">
				{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
			</Script>
			<Script id="breadcrumbs-jsonld" type="application/ld+json">
				{JSON.stringify(breadcrumbsJsonLd).replace(/</g, "\\u003c")}
			</Script>
			<main className="space-y-4">
				<h1 className="font-semibold text-xl tracking-tight sm:text-2xl lg:text-3xl">
					{product.name}
				</h1>
				<Breadcrumbs breadcrumbs={breadcrumbs} />
				<ProductOverview product={product} />
				<OffersList offers={offersPage.items} />
			</main>
		</>
	);
}

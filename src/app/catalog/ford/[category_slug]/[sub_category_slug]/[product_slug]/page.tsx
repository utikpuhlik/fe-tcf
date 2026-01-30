import type { Metadata } from "next";
import { OffersList } from "@/components/catalog/offers-list";
import ProductOverview from "@/components/catalog/product-overview";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { offersApi } from "@/lib/api/offerApi";
import { productsApi } from "@/lib/api/productApi";
import { buildCatalogPath, generateMeta } from "@/lib/utils";

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

	const [product, offers] = await Promise.all([
		productsApi.fetchBySlug(product_slug),
		offersApi.fetchByProductSlug(product_slug),
	]);

	return (
		<main className="space-y-4">
			<div className="mb-4">
				<Breadcrumbs
					breadcrumbs={[
						{ label: "Каталог", href: buildCatalogPath() },
						{
							label: product.sub_category.category.name,
							href: buildCatalogPath(product.sub_category.category),
						},
						{
							label: product.sub_category.name,
							href: buildCatalogPath(product.sub_category),
							active: true,
						},
					]}
				/>
			</div>

			<ProductOverview product={product} />

			<OffersList offers={offers.items} />
		</main>
	);
}

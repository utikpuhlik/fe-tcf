import { OffersList } from "@/components/catalog/offers-list";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { offersApi } from "@/lib/api/offerApi";
import { productsApi } from "@/lib/api/productApi";

interface Props {
	params: Promise<{ product_slug: string }>;
}

export default async function OffersPage({ params }: Props) {
	const { product_slug } = await params;

	const [product, offers] = await Promise.all([
		productsApi.fetchBySlug(product_slug),
		offersApi.fetchByProductSlug(product_slug),
	]);

	const sub_category_slug = product.sub_category.slug;
	const category_slug = product.sub_category.category.slug;
	const catalog_base_path = "/catalog/ford";

	return (
		<main className="space-y-4">
			<div className="mb-4">
				<Breadcrumbs
					breadcrumbs={[
						{ label: "Каталог", href: catalog_base_path },
						{
							label: product.sub_category.category.name,
							href: `${catalog_base_path}/${category_slug}`,
						},
						{
							label: product.sub_category.name,
							href: `${catalog_base_path}/${category_slug}/${sub_category_slug}`,
						},
						{
							label: product.name,
							href: `${catalog_base_path}/${category_slug}/${sub_category_slug}/${product_slug}`,
							active: true,
						},
					]}
				/>
			</div>

			<OffersList offers={offers.items} />
		</main>
	);
}

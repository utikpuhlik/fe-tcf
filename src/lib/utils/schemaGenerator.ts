import type { Offer, Product, ProductGroup, WithContext } from "schema-dts";
import { env } from "@/env";
import type { OfferSchema } from "@/lib/schemas/offerSchema";
import type { ProductSchema } from "@/lib/schemas/productSchema";
import { buildCatalogPath } from "@/lib/utils";

function buildVariantProductSchema(
	offer: OfferSchema,
	product: ProductSchema,
	groupId: string,
): Product {
	const variantName = offer.brand
		? `${product.name} ${offer.brand}`
		: product.name;

	return {
		"@type": "Product",
		name: variantName,
		image: offer.image_url,
		brand: {
			"@type": "Brand",
			name: offer.brand,
		},
		manufacturer: {
			"@type": "Organization",
			name: offer.brand,
		},
		mpn: offer.manufacturer_number,
		sku: offer.sku ?? undefined,
		isVariantOf: {
			"@id": groupId,
		},
	};
}

function buildOfferSchema(
	offer: OfferSchema,
	product: ProductSchema,
	groupId: string,
): Offer {
	return {
		"@type": "Offer",
		priceCurrency: "RUB",
		price: offer.price_rub?.toString() ?? "0",
		availability: offer.quantity > 0 ? "InStock" : "OutOfStock",
		itemOffered: buildVariantProductSchema(offer, product, groupId),
	};
}

export function generateOfferSchemaLD(
	offer: OfferSchema,
	product: ProductSchema,
): WithContext<Offer> {
	const groupId = `${env.NEXT_PUBLIC_APP_URL}${buildCatalogPath(product)}`;

	return {
		"@context": "https://schema.org",
		...buildOfferSchema(offer, product, groupId),
	};
}

export function generateProductSchemaLD(
	product: ProductSchema,
	_offers: OfferSchema[],
): WithContext<ProductGroup> {
	const groupId = `${env.NEXT_PUBLIC_APP_URL}${buildCatalogPath(product)}`;
	const variants = _offers.map((offer) => {
		const variant = buildVariantProductSchema(offer, product, groupId);
		return {
			...variant,
			offers: [buildOfferSchema(offer, product, groupId)],
		};
	});

	return {
		"@context": "https://schema.org",
		"@type": "ProductGroup",
		"@id": groupId,
		name: product.name,
		image: product.image_url,
		productGroupID: product.id,
		variesBy: ["manufacturer", "mpn"],
		...(product.cross_number ? { gtin: product.cross_number } : {}),
		...(variants.length > 0 ? { hasVariant: variants } : {}),
	};
}

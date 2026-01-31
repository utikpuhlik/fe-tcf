import type {
	BreadcrumbList,
	ListItem,
	Offer,
	Product,
	ProductGroup,
	WithContext,
} from "schema-dts";
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
		description: variantName,
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
		// shippingDetails: {
		// 	"@type": "OfferShippingDetails",
		// 	shippingDestination: {
		// 		"@type": "DefinedRegion",
		// 		addressCountry: ["RU", "BY", "KZ", "AM"],
		// 	},
		// 	shippingOrigin: {
		// 		"@type": "DefinedRegion",
		// 		addressCountry: "RU",
		// 	},
		// 	deliveryTime: {
		// 		"@type": "ShippingDeliveryTime",
		// 		handlingTime: {
		// 			"@type": "QuantitativeValue",
		// 			minValue: 1,
		// 			maxValue: 2,
		// 			unitCode: "d",
		// 		},
		// 		transitTime: {
		// 			"@type": "QuantitativeValue",
		// 			minValue: 2,
		// 			maxValue: 7,
		// 			unitCode: "d",
		// 		},
		// 	},
		// },
		// hasMerchantReturnPolicy: {
		// 	"@type": "MerchantReturnPolicy",
		// 	returnPolicyCategory:
		// 		"https://schema.org/MerchantReturnFiniteReturnWindow",
		// 	merchantReturnDays: 14,
		// 	returnMethod: [
		// 		"https://schema.org/ReturnByMail",
		// 		"https://schema.org/ReturnInStore",
		// 	],
		// 	applicableCountry: ["RU", "BY", "KZ", "AM"],
		// },
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

type Breadcrumb = {
	label: string;
	href: string;
};

function toAbsoluteUrl(href: string): string {
	if (href.startsWith("http://") || href.startsWith("https://")) {
		return href;
	}
	if (href.startsWith("/")) {
		return `${env.NEXT_PUBLIC_APP_URL}${href}`;
	}
	return `${env.NEXT_PUBLIC_APP_URL}/${href}`;
}

export function generateBreadcrumbs(
	breadcrumbs: Breadcrumb[],
): WithContext<BreadcrumbList> {
	const itemListElement: ListItem[] = breadcrumbs.map((breadcrumb, index) => ({
		"@type": "ListItem",
		position: index + 1,
		item: {
			"@id": toAbsoluteUrl(breadcrumb.href),
			name: breadcrumb.label,
		},
	}));

	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement,
	};
}

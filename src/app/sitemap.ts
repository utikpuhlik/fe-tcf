import type { MetadataRoute } from "next";
import { env } from "@/env";
import { categoriesApi } from "@/lib/api/categoryApi";
import { productsApi } from "@/lib/api/productApi";
import { subCategoriesApi } from "@/lib/api/subCategoryApi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// call the API that returns catalog paths and build the sitemap entries
	// Slug composition examples:
	// Product: baseUrl/catalog/ford/{c}/{sc}/{p}
	// SubCategory: baseUrl/catalog/ford/{c}/{sc}
	// Category: baseUrl/catalog/ford/{c}
	const [categoriesResponse, subCategoriesResponse, productsResponse] =
		await Promise.all([
			categoriesApi.fetchAll(),
			subCategoriesApi.fetchAll(),
			productsApi.fetchAll(),
		]);
	const baseUrl = env.NEXT_PUBLIC_APP_URL;
	const catalogBase = `${baseUrl}/catalog/ford`;

	const categories = categoriesResponse.items;
	const subCategories = subCategoriesResponse.items;
	const products = productsResponse.items;

	const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
		url: `${catalogBase}/${category.slug}`,
		lastModified: category.updated_at,
		changeFrequency: "weekly",
		priority: 0.8,
	}));

	const subCategoryEntries: MetadataRoute.Sitemap = subCategories.map(
		(subCategory) => ({
			url: `${catalogBase}/${subCategory.category.slug}/${subCategory.slug}`,
			lastModified: subCategory.updated_at,
			changeFrequency: "weekly",
			priority: 0.7,
		}),
	);

	const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
		url: `${catalogBase}/${product.sub_category.category.slug}/${product.sub_category.slug}/${product.slug}`,
		lastModified: product.updated_at,
		changeFrequency: "weekly",
		priority: 0.6,
	}));
	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: catalogBase,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/contacts`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/delivery`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/help`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.2,
		},
		...categoryEntries,
		...subCategoryEntries,
		...productEntries,
	];
}

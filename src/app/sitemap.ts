import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	// call the API that returns catalog paths
	// Only slug composition: baseUrl/catalog/ford/{c}/{sc}/{p}
	// Only slug composition: baseUrl/catalog/ford/{c}/{sc}
	// Only slug composition: baseUrl/catalog/ford/{c}
	// Last modified - updated_at field
	// Priority - ?
	// Change frequency - weekly
	const baseUrl =
		process.env.NEXT_PUBLIC_APP_URL || "https://fe-tcf.vercel.app";
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
			url: `${baseUrl}/catalog/ford`,
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
	];
}

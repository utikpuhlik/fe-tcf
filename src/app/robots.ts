import type { MetadataRoute } from "next";
import { env } from "@/env";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = env.NEXT_PUBLIC_APP_URL;
	if (env.ENV === "prod") {
		return {
			rules: {
				userAgent: "*",
				allow: "/",
				disallow: ["/account", "/profile", "/orders", "/api"],
			},
			sitemap: `${baseUrl}/sitemap.xml`,
		};
	}
	return {
		rules: {
			userAgent: "*",
			disallow: "/",
		},
	};
}

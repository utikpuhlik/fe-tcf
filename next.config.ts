import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		ppr: "incremental",
		serverActions: {
			bodySizeLimit: "3mb",
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "storage.yandexcloud.net",
				port: "",
				pathname: "/tcf-images/**",
				search: "",
			},
		],
	},
};

export default withSentryConfig(nextConfig, {
	org: "cad-models",
	project: "fe-tcf",
	silent: !process.env.CI,
	widenClientFileUpload: true,
	tunnelRoute: "/monitoring",
	disableLogger: true,
	automaticVercelMonitors: true,
});

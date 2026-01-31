import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		ENV: z.enum(["dev", "prod"]).default("dev"),
		RESEND_API_KEY: z.string(),
		DATABASE_URL: z.string(),
		BETTER_AUTH_WEBHOOK_SECRET: z.string(),
		BETTER_AUTH_SECRET: z.string(),
		TURNSTILE_SECRET_KEY: z.string(),
		YANDEX_GEOCODER_API_KEY: z.string(),
	},
	client: {
		NEXT_PUBLIC_API_URL: z.url(),
		NEXT_PUBLIC_APP_URL: z.string(),
		NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
			.string()
			.default("0x4AAAAAACG1ODz69-SuZrCY"),
		NEXT_PUBLIC_CART_STORAGE_KEY: z.string().default("cart-store"),
		NEXT_PUBLIC_GTM: z.string(),
		NEXT_PUBLIC_GOOGLE_VERIFICATION: z
			.string()
			.default("EtF4AEicf8JSNWnctwcJh-vbwmK1DF920YrUEphcenU"),
		NEXT_PUBLIC_YANDEX_VERIFICATION: z.string().default("7f8a52896845683c"),
		NEXT_PUBLIC_YANDEX_MAP_URL: z
			.string()
			.default("https://yandex.com/maps/-/CPARm2NK"),
	},
	runtimeEnv: {
		ENV: process.env.ENV,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		DATABASE_URL: process.env.DATABASE_URL,
		BETTER_AUTH_WEBHOOK_SECRET: process.env.BETTER_AUTH_WEBHOOK_SECRET,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
		YANDEX_GEOCODER_API_KEY: process.env.YANDEX_GEOCODER_API_KEY,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
		NEXT_PUBLIC_CART_STORAGE_KEY: process.env.NEXT_PUBLIC_CART_STORAGE_KEY,
		NEXT_PUBLIC_GTM: process.env.NEXT_PUBLIC_GTM,
		NEXT_PUBLIC_GOOGLE_VERIFICATION:
			process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
		NEXT_PUBLIC_YANDEX_VERIFICATION:
			process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
		NEXT_PUBLIC_YANDEX_MAP_URL: process.env.NEXT_PUBLIC_YANDEX_MAP_URL,
	},
});

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;

export const env = createEnv({
	server: {
		APP_ENV: z.string().default("dev"),
		RESEND_API_KEY: z.string(),
		DATABASE_URL: z.string(),
		BETTER_AUTH_WEBHOOK_SECRET: z.string(),
		TURNSTILE_SECRET_KEY: z.string(),
	},
	client: {
		NEXT_PUBLIC_API_URL: z.url(),
		NEXT_PUBLIC_APP_URL: z.string().default(NEXT_PUBLIC_APP_URL),
		NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
			.string()
			.default("0x4AAAAAACG1ODz69-SuZrCY"),
	},
	runtimeEnv: {
		APP_ENV: process.env.APP_ENV,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		DATABASE_URL: process.env.DATABASE_URL,
		BETTER_AUTH_WEBHOOK_SECRET: process.env.BETTER_AUTH_WEBHOOK_SECRET,
		TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
	},
});

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;

export const env = createEnv({
	server: {
		APP_ENV: z.string().default("dev"),
		RESEND_API_KEY: z.string(),
		DATABASE_URL: z.string(),
	},
	client: {
		NEXT_PUBLIC_API_URL: z.url(),
		NEXT_PUBLIC_APP_URL: z.string().default(NEXT_PUBLIC_APP_URL),
	},
	runtimeEnv: {
		APP_ENV: process.env.APP_ENV,
		DATABASE_URL: process.env.DATABASE_URL,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	},
});

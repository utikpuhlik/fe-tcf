import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";

interface SessionCallbackArgs {
	session: Record<string, string>;
	token: Record<string, string>;
}

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
		// usePlural: true,
	}),
	advanced: {
		database: {
			generateId: () => crypto.randomUUID(),
		},
	},

	emailAndPassword: {
		enabled: true,
	},

	plugins: [nextCookies()],

	callbacks: {
		async session({ session, token }: SessionCallbackArgs) {
			session.userId = token.userId;
			session.role = token.role;
			return session;
		},
	},
});

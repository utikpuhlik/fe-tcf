import { render } from "@react-email/render";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { VerifyEmailTemplate } from "@/emails/verify-email";
import { resend } from "@/lib/email/resend";

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
	user: {
		deleteUser: {
			enabled: true,
		},
	},

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			const urlObj = new URL(url);
			urlObj.searchParams.set("callbackURL", "/");

			const emailHtml = await render(
				VerifyEmailTemplate({
					name: user.name || "User",
					link: urlObj.toString(),
				}),
			);
			await resend.emails.send({
				from: "TCF <no-reply@info.eucalytics.uk>",
				to: user.email,
				subject: "Подтвердите ваш email адрес",
				html: emailHtml,
			});
		},
		autoSignInAfterVerification: true,
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

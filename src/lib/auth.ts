import { render } from "@react-email/render";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";
import { db } from "@/db";
import { schema } from "@/db/schema";
import VerifyUserEmail from "@/emails/verify-email";
import { env } from "@/env";
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
		additionalFields: {
			first_name: {
				type: "string",
				required: true,
			},
			last_name: {
				type: "string",
				required: true,
			},
		},
	},
	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					try {
						await fetch(`${env.NEXT_PUBLIC_API_URL}/webhooks/better-auth`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								"x-better-auth-secret": env.BETTER_AUTH_WEBHOOK_SECRET,
							},
							body: JSON.stringify({
								type: "user.created",
								data: {
									id: user.id,
									email: user.email,
									name: user.name,
									first_name: user.first_name,
									last_name: user.last_name,
								},
							}),
						});
					} catch (error) {
						console.error(
							"[BetterAuth] Error sending user.created webhook",
							error,
						);
					}
				},
			},
			update: {
				after: async (user) => {
					try {
						await fetch(`${env.NEXT_PUBLIC_API_URL}/webhooks/better-auth`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								"x-better-auth-secret": env.BETTER_AUTH_WEBHOOK_SECRET,
							},
							body: JSON.stringify({
								type: "user.updated",
								data: {
									id: user.id,
									email: user.email,
									name: user.name,
									first_name: user.first_name,
									last_name: user.last_name,
								},
							}),
						});
					} catch (error) {
						console.error(
							"[BetterAuth] Error sending user.updated webhook",
							error,
						);
					}
				},
			},
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
				VerifyUserEmail({
					name: user.name || "User",
					link: urlObj.toString(),
					headingText: "Активация учетной записи",
				}),
			);
			await resend.emails.send({
				from: "Торговый центр Форд <no-reply@info.eucalytics.uk>",
				to: user.email,
				subject: "Активация учетной записи | TCF",
				html: emailHtml,
			});
		},
		autoSignInAfterVerification: true,
	},

	plugins: [jwt(), nextCookies()],

	callbacks: {
		async session({ session, token }: SessionCallbackArgs) {
			session.userId = token.userId;
			session.role = token.role;
			return session;
		},
	},
});

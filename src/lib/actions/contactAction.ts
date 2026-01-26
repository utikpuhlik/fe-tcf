"use server";

import { resend } from "@/lib/email/resend";

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

export async function sendContactMessageAction(formData: FormData) {
	const email = String(formData.get("email") ?? "").trim();
	const message = String(formData.get("message") ?? "").trim();

	if (!email || !message) {
		return;
	}

	const safeEmail = escapeHtml(email);
	const safeMessage = escapeHtml(message);

	try {
		await resend.emails.send({
			from: "Торговый центр Форд <info@info.eucalytics.uk>",
			to: "fordsevas@yandex.ru",
			subject: "Сообщение с сайта TCF",
			replyTo: email,
			html: `
				<h2>Новое сообщение с сайта</h2>
				<p><strong>Email:</strong> ${safeEmail}</p>
				<p><strong>Сообщение:</strong></p>
				<pre style="white-space: pre-wrap; font-family: inherit;">${safeMessage}</pre>
			`,
		});
	} catch (error) {
		console.error("[Contact] Error sending message", error);
	}
}

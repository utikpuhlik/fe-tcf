"use server";

import { render } from "@react-email/render";
import { revalidatePath } from "next/cache";
import OrderCreatedEmail from "@/emails/order-created";
import { env } from "@/env";
import { ordersApi } from "@/lib/api/orderApi";
import { resend } from "@/lib/email/resend";
import type {
	OrderSchema,
	OrderWithOffersPostSchema,
} from "@/lib/schemas/orderSchema";

export async function createOrderAction(
	order: OrderWithOffersPostSchema,
): Promise<OrderSchema> {
	const createdOrder = await ordersApi.post(order);
	revalidatePath("/orders");

	const trackingUrl = `${env.NEXT_PUBLIC_APP_URL}/orders/${createdOrder.id}`;
	const logoUrl = `${env.NEXT_PUBLIC_APP_URL}/logo/logo.png`;
	const customerName =
		`${createdOrder.first_name} ${createdOrder.last_name}`.trim();

	try {
		const emailHtml = await render(
			OrderCreatedEmail({
				name: customerName,
				orderId: createdOrder.id,
				trackingUrl,
				logoUrl,
			}),
		);

		await resend.emails.send({
			from: "Торговый центр Форд <info@info.eucalytics.uk>",
			to: createdOrder.email,
			subject: "Заказ принят | TCF",
			html: emailHtml,
		});
	} catch (error) {
		console.error("[Order] Error sending confirmation email", error);
	}

	return createdOrder;
}

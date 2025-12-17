"use server";

import { revalidatePath } from "next/cache";

import { ordersApi } from "@/lib/api/orderApi";
import type { OrderWithOffersPostSchema } from "@/lib/schemas/orderSchema";

export async function createOrderAction(
	order: OrderWithOffersPostSchema,
): Promise<void> {
	await ordersApi.post(order);
	revalidatePath("/orders");
}

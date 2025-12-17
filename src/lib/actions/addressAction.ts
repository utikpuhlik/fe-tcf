"use server";

import { revalidatePath } from "next/cache";

import { addressesApi } from "@/lib/api/addressApi";
import type { AddressPostSchema } from "@/lib/schemas/addressSchema";

export async function createAddressAction(
	address: AddressPostSchema,
): Promise<void> {
	await addressesApi.post(address);
	revalidatePath("/addresses");
}

import { z } from "zod";

import { zPaginatedSchema, zWaybillTypeEnum } from "@/lib/schemas/commonSchema";
import { zUserSchema } from "@/lib/schemas/userSchema";
import { zWaybillOfferPostSchema } from "@/lib/schemas/waybillOfferSchema";

const zWaybillBaseSchema = z.object({
	customer_id: z.uuid().nullable(),
	waybill_type: zWaybillTypeEnum,
	is_pending: z.boolean(),
	note: z.string().nullable(),
});

export const zWaybillSchema = zWaybillBaseSchema.extend({
	id: z.uuid(),
	order_id: z.uuid().nullable(),
	author: zUserSchema,
	customer: zUserSchema,
	created_at: z.iso.datetime(),
	updated_at: z.iso.datetime(),
});

export const zWaybillPaginatedSchema = zPaginatedSchema.extend({
	items: z.array(zWaybillSchema),
});

export const zWaybillPostSchema = zWaybillBaseSchema.extend({});

export const zWaybillWithOffersPostSchema = zWaybillBaseSchema.extend({
	// workaround with optional to use default value
	waybill_offers: z.array(zWaybillOfferPostSchema).default([]).optional(),
});

export const zWaybillPutSchema = zWaybillBaseSchema.extend({});

/** TypeScript helper */
export type WaybillSchema = z.infer<typeof zWaybillSchema>;
export type WaybillPostSchema = z.infer<typeof zWaybillPostSchema>;
export type WaybillWithOffersPostSchema = z.infer<
	typeof zWaybillWithOffersPostSchema
>;
export type WaybillPutSchema = z.infer<typeof zWaybillPutSchema>;
export type WaybillPaginatedSchema = z.infer<typeof zWaybillPaginatedSchema>;

import { z } from "zod";

import {
	zOrderStatusEnum,
	zPaginatedSchema,
	zShippingCompanyEnum,
	zShippingCountryEnum,
	zShippingMethodEnum,
} from "@/lib/schemas/commonSchema";
import {
	zOrderOfferPostSchema,
	zOrderOfferSchema,
} from "@/lib/schemas/orderOfferSchema";
import { zUserSchema } from "@/lib/schemas/userSchema";
import { zWaybillSchema } from "@/lib/schemas/waybillSchema";

const zOrderBaseSchema = z.object({
	status: zOrderStatusEnum,
	note: z.string().nullable(),
	address: z.string().nullable(),
	country: zShippingCountryEnum.nullable(),
	city: z.string().nullable(),

	shipping_method: zShippingMethodEnum,
	shipping_company: zShippingCompanyEnum.nullable(),

	first_name: z.string(),
	last_name: z.string(),
	email: z.string(),
	phone: z.string(),
});

export const zOrderSchema = zOrderBaseSchema.extend({
	id: z.uuid(),
	user: zUserSchema.nullable(),
	waybill: zWaybillSchema.nullable(),
	order_offers: zOrderOfferSchema.array(),
	created_at: z.iso.datetime(),
	updated_at: z.iso.datetime(),
	total_sum: z.number().int().nonnegative(),
});

export const zOrderPaginatedSchema = zPaginatedSchema.extend({
	items: z.array(zOrderSchema),
});

export const zOrderPostSchema = zOrderBaseSchema.extend({});
export const zOrderWithOffersPostSchema = zOrderBaseSchema.extend({
	// workaround with optional to use default value
	order_offers: z.array(zOrderOfferPostSchema).default([]).optional(),
	user_id: z.uuid().nullable(),
});

export const zOrderPutSchema = zOrderBaseSchema.extend({});

/** TypeScript helpers */
export type OrderSchema = z.infer<typeof zOrderSchema>;
export type OrderPaginatedSchema = z.infer<typeof zOrderPaginatedSchema>;
export type OrderPostSchema = z.infer<typeof zOrderPostSchema>;
export type OrderWithOffersPostSchema = z.infer<
	typeof zOrderWithOffersPostSchema
>;

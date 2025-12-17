import { z } from "zod";

import { zOfferSchema } from "@/lib/schemas/offerSchema";

export const zWaybillOfferBaseSchema = z.object({
	offer_id: z.uuid(),
	brand: z.string().min(1, "Бренд не может быть пустым"),
	manufacturer_number: z
		.string()
		.min(1, "Номер производителя не может быть пустым"),
	quantity: z
		.number()
		.int({ error: "Поле должно быть целым числом" })
		.gt(0, { message: "Кол-во должно быть > 0" }),
	price_rub: z.number({ error: "Поле должно быть числом" }).nonnegative({
		message: "Цена не может быть меньше нуля",
	}),
});

export const zWaybillOfferSchema = zWaybillOfferBaseSchema.extend({
	id: z.uuid(),
	waybill_id: z.uuid(),
	offer: zOfferSchema,
});

export const zWaybillOfferPostSchema = zWaybillOfferBaseSchema.extend({});

export const zWaybillOfferPutSchema = zWaybillOfferBaseSchema.extend({});

/** TypeScript helper */
export type WaybillOfferSchema = z.infer<typeof zWaybillOfferSchema>;
export type WaybillOfferPostSchema = z.infer<typeof zWaybillOfferPostSchema>;
export type WaybillOfferPutSchema = z.infer<typeof zWaybillOfferPutSchema>;

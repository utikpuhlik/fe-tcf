import { z } from "zod";

import { zOfferSchema } from "@/lib/schemas/offerSchema";

export const zOrderOfferBaseSchema = z.object({
	offer_id: z.uuid(),
	brand: z.string().min(1, "Бренд не может быть пустым"),
	manufacturer_number: z
		.string()
		.min(1, "Номер производителя не может быть пустым"),
	quantity: z
		.number()
		.int({ error: "Поле должно быть целым числом" })
		.gt(0, { message: "Кол-во должно быть > 0" }),
	price_rub: z.number().nonnegative({
		message: "Цена не может быть меньше нуля",
	}),
});

export const zOrderOfferSchema = zOrderOfferBaseSchema.extend({
	id: z.uuid(),
	order_id: z.uuid(),
	offer: zOfferSchema,
});

export const zOrderOfferPostSchema = zOrderOfferBaseSchema.extend({});

export const zOrderOfferPutSchema = zOrderOfferBaseSchema.extend({});

/** TypeScript helper */
export type OrderOfferSchema = z.infer<typeof zOrderOfferSchema>;
export type OrderOfferPostSchema = z.infer<typeof zOrderOfferPostSchema>;
export type OrderOfferPutSchema = z.infer<typeof zOrderOfferPutSchema>;

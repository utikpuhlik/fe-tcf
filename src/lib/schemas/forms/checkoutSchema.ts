import { z } from "zod";

export const zDeliveryMethod = z.enum(["pickup", "delivery"]);
export type DeliveryMethod = z.infer<typeof zDeliveryMethod>;

export const zCheckoutSchema = z
	.object({
		method: zDeliveryMethod,

		contact: z.object({
			firstName: z.string().min(1, "Введите имя"),
			lastName: z.string().min(1, "Введите фамилию"),
			email: z.email("Некорректный email"),
			phone: z.string().min(6, "Введите телефон"),
		}),

		// Для доставки
		delivery: z
			.object({
				addressQuery: z.string().min(1, "Начните вводить адрес"),
				country: z.string().min(1, "Укажите страну"),
				city: z.string().min(1, "Укажите город"),
				street: z.string().min(1, "Укажите улицу"),
				houseNumber: z.string().min(1, "Укажите дом/кв."),
				postalCode: z.string().min(1, "Укажите индекс"),
			})
			.optional(),

		// Для самовывоза
		pickup: z.object({}).optional(),
	})
	.superRefine((val, ctx) => {
		if (val.method === "delivery") {
			if (!val.delivery) {
				ctx.addIssue({
					code: "custom",
					path: ["delivery"],
					message: "Заполните данные доставки",
				});
				return;
			}
		}

		if (val.method === "pickup") return;
	});

export type CheckoutSchema = z.infer<typeof zCheckoutSchema>;

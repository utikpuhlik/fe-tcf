import { z } from "zod";
import {
	zShippingCompanyEnum,
	zShippingCountryEnum,
	zShippingMethodEnum,
} from "@/lib/schemas/commonSchema";

export const zCheckoutSchema = z
	.object({
		method: zShippingMethodEnum,

		contact: z.object({
			firstName: z.string().min(1, "Введите имя"),
			lastName: z.string().min(1, "Введите фамилию"),
			email: z.email("Некорректный email"),
			phone: z.string().min(6, "Введите телефон в формате +70000000000"),
		}),

		delivery: z
			.object({
				address: z.string().min(1, "Начните вводить адрес"),
				country: zShippingCountryEnum,
				city: z.string().min(1, "Укажите город"),
				shippingCompany: zShippingCompanyEnum,
			})
			.optional(),

		// Для самовывоза
		pickup: z.object({}).optional(),
	})
	.superRefine((val, ctx) => {
		if (val.method === "CARGO") {
			if (!val.delivery) {
				ctx.addIssue({
					code: "custom",
					path: ["delivery"],
					message: "Заполните данные доставки",
				});
				return;
			}
		}

		if (val.method === "SELF_PICKUP") return;
	});

export type CheckoutSchema = z.infer<typeof zCheckoutSchema>;

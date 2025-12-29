import { z } from "zod";

const zBaseSchema = z.object({
	email: z.email("Неверный формат email"),
	password: z.string().min(8, "Минимально 8 символов"),
	// turnstileToken: z.string().min(1, "Подтвердите, что вы не бот."),
});

export const zSignInSchema = zBaseSchema.extend({});

export const zSignUpSchema = zBaseSchema
	.extend({
		confirm_password: z.string().min(8, "Пароли не совпадают"),
		first_name: z.string().min(2, "Поле не может быть пустым"),
		last_name: z.string().min(2, "Поле не может быть пустым"),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirm_password) {
			ctx.addIssue({
				code: "custom",
				path: ["confirm_password"],
				message: "Пароли не совпадают",
			});
		}
	});

export type SignUpSchema = z.infer<typeof zSignUpSchema>;
export type SignInSchema = z.infer<typeof zSignInSchema>;

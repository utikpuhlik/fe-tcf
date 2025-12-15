"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

export function AuthProvider({ children }: { children: ReactNode }) {
	const router = useRouter();

	return (
		<AuthUIProvider
			authClient={authClient}
			navigate={router.push}
			replace={router.replace}
			onSessionChange={() => {
				// Clear router cache (protected routes)
				router.refresh();
			}}
			captcha={{
				provider: "cloudflare-turnstile",
				siteKey: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
				hideBadge: true,
			}}
			passkey
			Link={Link}
			additionalFields={{
				first_name: {
					label: "Имя",
					placeholder: "Ваше имя",
					description: "Укажите ваше имя",
					required: true,
					type: "string",
					instructions:
						"Имя должно содержать только буквы и быть от 2 до 32 символов.",
				},
				last_name: {
					label: "Фамилия",
					placeholder: "Ваша фамилия",
					description: "Укажите вашу фамилию",
					required: true,
					type: "string",
					instructions:
						"Фамилия должна содержать только буквы и быть от 2 до 32 символов.",
				},
			}}
			// какие поля показывать в аккаунте
			account={{
				fields: ["first_name", "last_name"],
			}}
			localization={{
				ACCOUNT: "Аккаунт",
				SECURITY: "Безопасность",
				SIGN_IN: "Вход",
				SIGN_UP: "Регистрация",
				SIGN_OUT: "Выход",
				SETTINGS: "Настройки",
				MAGIC_LINK: "Войти по ссылке",
				EMAIL: "Электронная почта",
				EMAIL_DESCRIPTION: "Пожалуйста, введите ваш адрес электронной почты.",
				NAME: "Имя",
				NAME_DESCRIPTION: "Пожалуйста, введите ваше полное имя.",
				PASSWORD: "Пароль",
				FORGOT_PASSWORD: "Забыли пароль?",
				FORGOT_PASSWORD_LINK: "Забыли пароль?",
				DONT_HAVE_AN_ACCOUNT: "Нет учетной записи?",
				ALREADY_HAVE_AN_ACCOUNT: "Есть учетная запись?",
				RESET_PASSWORD: "Сброс пароля",
				GO_BACK: "Назад",
				SIGN_IN_ACTION: "Войти",
				SIGN_UP_ACTION: "Зарегистрироваться",
				SAVE: "Сохранить",
				RESET_PASSWORD_ACTION: "Сбросить пароль",
				SIGN_IN_DESCRIPTION:
					"Введите свои учетные данные, чтобы войти в систему.",
				UPDATED_SUCCESSFULLY: "Успешно изменён",
				IS_THE_SAME: "Одинаковый",
				CURRENT_PASSWORD: "Актуальный пароль",
				CURRENT_PASSWORD_PLACEHOLDER: "Актуальный пароль",
				NEW_PASSWORD: "Новый пароль",
				NEW_PASSWORD_PLACEHOLDER: "Новый пароль",
				CHANGE_PASSWORD_SUCCESS: "Пароль был успешно изменён",
			}}
		>
			{children}
		</AuthUIProvider>
	);
}

"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { authClient } from "@/lib/auth-client";

export function Providers({ children }: { children: ReactNode }) {
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
			magicLink
			passkey
			Link={Link}
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
			}}
		>
			{children}
		</AuthUIProvider>
	);
}

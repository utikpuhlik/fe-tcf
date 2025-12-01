import { AuthView } from "@daveyplate/better-auth-ui";
import { authViewPaths } from "@daveyplate/better-auth-ui/server";

export const dynamicParams = false;

export function generateStaticParams() {
	return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({
	params,
}: {
	params: Promise<{ path: string }>;
}) {
	const { path } = await params;

	return (
		<main className="container flex grow flex-col items-center justify-center self-center p-4 md:p-6">
			<AuthView
				path={path}
				localization={{
					SIGN_IN: "Вход",
					SIGN_UP: "Регистрация",
					MAGIC_LINK: "Войти по ссылке",
					EMAIL: "Электронная почта",
					PASSWORD: "Пароль",
					FORGOT_PASSWORD: "Забыли пароль?",
					RESET_PASSWORD: "Сброс пароля",
					GO_BACK: "Назад",
					SIGN_IN_ACTION: "Войти",
					SIGN_UP_ACTION: "Зарегистрироваться",
					RESET_PASSWORD_ACTION: "Сбросить пароль",
					SIGN_IN_DESCRIPTION:
						"Введите свои учетные данные, чтобы войти в систему.",
				}}
			/>
		</main>
	);
}

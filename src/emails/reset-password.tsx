import { Button, Heading, Text } from "@react-email/components";
import { EmailLayout } from "./layout";

export const ResetPasswordTemplate = ({
	name,
	link,
}: {
	name: string;
	link: string;
}) => (
	<EmailLayout>
		<Heading className="mb-4 font-semibold text-xl">Сброс пароля 🔐</Heading>

		<Text className="mb-4 text-gray-700">
			Привет, {name}! Поступил запрос на сброс пароля.
		</Text>

		<Button
			href={link}
			className="rounded-lg bg-black px-5 py-3 font-medium text-sm text-white"
		>
			Сбросить пароль
		</Button>

		<Text className="mt-6 text-gray-500">
			Если это были не вы — просто проигнорируйте это письмо.
		</Text>
	</EmailLayout>
);

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
		<Heading className="text-xl font-semibold mb-4">Сброс пароля 🔐</Heading>

		<Text className="text-gray-700 mb-4">
			Привет, {name}! Поступил запрос на сброс пароля.
		</Text>

		<Button
			href={link}
			className="bg-black text-white px-5 py-3 rounded-lg text-sm font-medium"
		>
			Сбросить пароль
		</Button>

		<Text className="text-gray-500 mt-6">
			Если это были не вы — просто проигнорируйте это письмо.
		</Text>
	</EmailLayout>
);

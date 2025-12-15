import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	pixelBasedPreset,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
	name?: string;
	email?: string;
	link?: string;
	headingText: string;
}

const baseUrl = "https://fe-tcf.vercel.app";

export const ResetPasswordEmail = ({
	name,
	link,
	headingText,
}: ResetPasswordEmailProps) => {
	const previewText = `Сброс пароля | TCF`;

	return (
		<Html>
			<Head />
			<Tailwind
				config={{
					presets: [pixelBasedPreset],
				}}
			>
				<Body className="mx-auto my-auto bg-white px-2 font-sans">
					<Preview>{previewText}</Preview>
					<Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
						<Section className="mt-[24px]">
							<Img
								src={`${baseUrl}/logo/logo.png`}
								width="128"
								height="40"
								alt="Logo"
								className="mx-auto my-0"
							/>
						</Section>
						<Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[18px] text-black">
							<Hr />
							{headingText}
							<Hr />
						</Heading>

						<Text className="text-[14px] text-black leading-[24px]">
							Здравствуйте, {name}!
						</Text>
						<Text>
							Вы запросили сброс пароля для учётной записи клиента TCF{" "}
							<Link href={"https://ford-parts.com.ru"}>TCF</Link>. Вы можете
							сбросить пароль, нажав на кнопку ниже.
						</Text>
						<Section className="mt-[32px] mb-[32px] text-center">
							<Button
								className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
								href={link}
							>
								Восстановить
							</Button>
						</Section>
						<Text className="text-[14px] text-black leading-[24px]">
							или скопируйте URL ссылку и вставьте в вашем браузере:{" "}
							<Link href={link} className="text-blue-600 no-underline">
								{link}
							</Link>
						</Text>
						<Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							Если вы не ожидали это увидеть, проигнорируйте письмо. Если у вас
							есть вопросы, ответьте на это письмо или свяжитесь с нами по
							адресу:{" "}
							<Link
								href="mailto:fordsevas@yandex.ru"
								className="text-blue-600 no-underline"
							>
								fordsevas@yandex.ru
							</Link>
							.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

ResetPasswordEmail.PreviewProps = {
	name: "Владислав",
	link: "https://fe-tcf.vercel.app",
	headingText: "Восстановление пароля",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;

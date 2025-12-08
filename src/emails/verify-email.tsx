import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Html,
	pixelBasedPreset,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

export const VerifyEmailTemplate = ({
	name,
	link,
}: {
	name: string;
	link: string;
}) => {
	return (
		<Html>
			<Head />
			<Tailwind
				config={{
					presets: [pixelBasedPreset],
				}}
			>
				<Body className="bg-[#f6f6f6] py-10 font-sans">
					<Container className="mx-auto max-w-[480px] rounded-lg bg-white p-8 shadow-md">
						<Section>
							<Heading className="mb-4 font-semibold text-black text-xl">
								Подтвердите вашу почту
							</Heading>

							<Text className="mb-4 text-[#444] text-[14px] leading-[22px]">
								Здравствуйте, {name}! Добро пожаловать в TCF 👋
							</Text>

							<Text className="mb-6 text-[#444] text-[14px] leading-[22px]">
								Чтобы завершить регистрацию, нажмите кнопку ниже.
							</Text>

							<Section className="my-6 text-center">
								<Button
									href={link}
									className="inline-block rounded-lg bg-black px-5 py-3 font-medium text-sm text-white"
								>
									Подтвердить email
								</Button>
							</Section>

							<Text className="mt-6 text-[#777] text-[12px] leading-[20px]">
								Если вы не запрашивали создание аккаунта — просто игнорируйте
								письмо.
							</Text>

							<Row className="mt-8">
								<Column align="center">
									<Text className="text-center text-[#999] text-[12px]">
										© {new Date().getFullYear()} TCF — Ford запчасти
									</Text>
								</Column>
							</Row>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

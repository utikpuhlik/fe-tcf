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
					<Container className="bg-white rounded-lg p-8 shadow-md mx-auto max-w-[480px]">
						<Section>
							<Heading className="text-xl font-semibold mb-4 text-black">
								Подтвердите вашу почту
							</Heading>

							<Text className="text-[14px] leading-[22px] text-[#444] mb-4">
								Здравствуйте, {name}! Добро пожаловать в TCF 👋
							</Text>

							<Text className="text-[14px] leading-[22px] text-[#444] mb-6">
								Чтобы завершить регистрацию, нажмите кнопку ниже.
							</Text>

							<Section className="text-center my-6">
								<Button
									href={link}
									className="bg-black text-white px-5 py-3 rounded-lg text-sm font-medium inline-block"
								>
									Подтвердить email
								</Button>
							</Section>

							<Text className="text-[12px] text-[#777] leading-[20px] mt-6">
								Если вы не запрашивали создание аккаунта — просто игнорируйте
								письмо.
							</Text>

							<Row className="mt-8">
								<Column align="center">
									<Text className="text-[12px] text-[#999] text-center">
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

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

interface OrderCreatedEmailProps {
	name: string;
	orderId: string;
	trackingUrl: string;
	logoUrl: string;
}

export const OrderCreatedEmail = ({
	name,
	orderId,
	trackingUrl,
	logoUrl,
}: OrderCreatedEmailProps) => {
	const previewText = `Благодарим вас за заказ ${orderId}`;
	const greeting = `Здравствуйте, ${name}!`;

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
								src={logoUrl}
								width="128"
								height="40"
								alt="Logo"
								className="mx-auto my-0"
							/>
						</Section>
						<Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[18px] text-black">
							<Hr />
							Заказ принят
							<Hr />
						</Heading>

						<Text className="text-[14px] text-black leading-[24px]">
							{greeting}
						</Text>
						<Text className="text-[14px] text-black leading-[24px]">
							Мы получили ваш заказ. Наши менеджеры скоро свяжутся с вами.
						</Text>
						<Text className="text-[14px] text-black leading-[24px]">
							Номер заказа: <strong>{orderId}</strong>
						</Text>
						<Section className="mt-[32px] mb-[32px] text-center">
							<Button
								className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
								href={trackingUrl}
							>
								Отследить заказ
							</Button>
						</Section>
						<Text className="text-[14px] text-black leading-[24px]">
							Если кнопка не работает, откройте ссылку:{" "}
							<Link href={trackingUrl} className="text-blue-600 no-underline">
								{trackingUrl}
							</Link>
						</Text>
						<Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							Если вы не оформляли заказ, просто проигнорируйте это письмо. Если
							у вас есть вопросы, ответьте на это письмо или свяжитесь с нами по
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

OrderCreatedEmail.PreviewProps = {
	name: "Владислав",
	orderId: "00000000-0000-0000-0000-000000000000",
	trackingUrl:
		"https://fe-tcf.vercel.app/orders/00000000-0000-0000-0000-000000000000",
	logoUrl: "https://fe-tcf.vercel.app/logo/logo.png",
} as OrderCreatedEmailProps;

export default OrderCreatedEmail;

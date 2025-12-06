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

interface VercelInviteUserEmailProps {
	username?: string;
	invitedByUsername?: string;
	invitedByEmail?: string;
	teamName?: string;
	inviteLink?: string;
	headingText: string;
}

const baseUrl = "http://localhost:3000";

export const VercelInviteUserEmail = ({
	username,
	invitedByUsername,
	invitedByEmail,
	teamName,
	inviteLink,
	headingText,
}: VercelInviteUserEmailProps) => {
	const previewText = `Join ${invitedByUsername} on Vercel`;

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
								src={`${baseUrl}/logo/logo.svg`}
								width="128"
								height="40"
								alt="Vercel Logo"
								className="mx-auto my-0"
							/>
						</Section>
						<Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[18px] text-black">
							<Hr />
							{headingText}
							<Hr />
						</Heading>
						<Text className="text-[14px] text-black leading-[24px]">
							Hello {username},
						</Text>
						<Text className="text-[14px] text-black leading-[24px]">
							<strong>{invitedByUsername}</strong> (
							<Link
								href={`mailto:${invitedByEmail}`}
								className="text-blue-600 no-underline"
							>
								{invitedByEmail}
							</Link>
							) has invited you to the <strong>{teamName}</strong> team on{" "}
							<strong>Vercel</strong>.
						</Text>
						<Section className="mt-[32px] mb-[32px] text-center">
							<Button
								className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
								href={inviteLink}
							>
								Подтвердить
							</Button>
						</Section>
						<Text className="text-[14px] text-black leading-[24px]">
							or copy and paste this URL into your browser:{" "}
							<Link href={inviteLink} className="text-blue-600 no-underline">
								{inviteLink}
							</Link>
						</Text>
						<Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							Если вы не ожидали это увидеть, проигнорируйте это письмо. Если вы
							обеспокоены безопасностью своего аккаунта, пожалуйста, ответьте на
							это письмо, чтобы связаться с нами.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

VercelInviteUserEmail.PreviewProps = {
	username: "alanturing",
	invitedByUsername: "Alan",
	invitedByEmail: "alan.turing@example.com",
	teamName: "Enigma",
	inviteLink: "https://vercel.com",
	headingText: "Подтвердите адрес электронной почты",
} as VercelInviteUserEmailProps;

export default VercelInviteUserEmail;

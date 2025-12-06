import {
	Body,
	Column,
	Container,
	Head,
	Html,
	pixelBasedPreset,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

export const EmailLayout = ({ children }: { children: React.ReactNode }) => (
	<Html>
		<Head />
		<Tailwind
			config={{
				presets: [pixelBasedPreset],
				theme: {
					extend: {
						colors: {
							primary: "#1e3a8a", // prussian blue
						},
						fontFamily: {
							sans: ["Geist", "system-ui", "Arial", "sans-serif"],
						},
					},
				},
			}}
		>
			<Body className="bg-[#f6f6f6] py-10">
				<Container className="mx-auto max-w-[480px] bg-white rounded-xl shadow-sm p-8">
					<Section>
						{children}
						<Row>
							<Column align="center">
								<Text className="text-xs text-gray-500 mt-6 text-center">
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

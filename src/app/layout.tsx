import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/layout/footer/footer";

export const metadata: Metadata = {
	title: "Магазин автозапчастей Ford | TCF",
	description: "Магазин автозапчастей Ford | TCF",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body>
				{/*<Navbar1/>*/}
				{children}
				<SpeedInsights />
				<Analytics />
				<Footer />
			</body>
		</html>
	);
}

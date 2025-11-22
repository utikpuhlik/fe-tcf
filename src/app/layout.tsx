import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
// import { ruRU } from "@clerk/localizations";
// import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";

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
		// <ClerkProvider localization={ruRU}>
		<html lang="en" className={GeistSans.className}>
			<body>
				<Header />
				{children}
				<GoogleAnalytics gaId={"G-9X3EXVF7ES"} />
				<SpeedInsights />
				<Analytics />
				<Footer />
			</body>
		</html>
		// </ClerkProvider>
	);
}

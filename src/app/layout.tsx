import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "@/components/layout/auth-provider";
import Footer from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";
import { ThemedTopLoader } from "@/components/layout/top-loader";
import { Toaster } from "@/components/ui/sonner";

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
				<AuthProvider>
					<ThemedTopLoader />
					<Header />
					{children}
					<Toaster />
					<GoogleAnalytics gaId={"G-9X3EXVF7ES"} />
					<SpeedInsights />
					<Analytics />
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}

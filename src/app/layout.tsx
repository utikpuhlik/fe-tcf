import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type React from "react";
import { AuthProvider } from "@/components/layout/auth-provider";
import { CartStoreProvider } from "@/components/layout/cart-store-provider";
import Footer from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";
import { ThemedTopLoader } from "@/components/layout/top-loader";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env";
import {
	autoPartsStoreJsonLd,
	organizationJsonLd,
} from "@/lib/utils/schemaStatic";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" className={GeistSans.className}>
			<GoogleTagManager gtmId={env.NEXT_PUBLIC_GTM} />
			<body>
				<Script id="org-jsonld" type="application/ld+json">
					{JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c")}
				</Script>
				<Script id="store-jsonld" type="application/ld+json">
					{JSON.stringify(autoPartsStoreJsonLd).replace(/</g, "\\u003c")}
				</Script>
				<AuthProvider>
					<ThemedTopLoader />
					<CartStoreProvider>
						<Header />
						<div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
							{children}
						</div>
					</CartStoreProvider>
					<Toaster />
					<SpeedInsights />
					<Analytics />
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}

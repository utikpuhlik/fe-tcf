import type { Metadata } from "next";
import { ContactsInfoCard } from "@/components/home/contacts-info-card";
import { FeaturedCategoriesSection } from "@/components/home/featured-categories-section";
import { HomeHeader } from "@/components/home/home-header";
import { PaymentsInfoCard } from "@/components/home/payments-info-card";
import { SupportInfoCard } from "@/components/home/support-info-card";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
	return generateMeta({
		title: "Магазин автозапчастей Ford",
		description:
			"Продажа автозапчастей Ford в Севастополе с доставкой по России и странам СНГ",
		canonical: "/",
	});
}

export default async function Home() {
	return (
		<main className="min-h-screen text-neutral-900">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-14">
				<HomeHeader />
				<FeaturedCategoriesSection />
				<section className="grid auto-rows-[minmax(0,1fr)] gap-6 md:grid-cols-3">
					<PaymentsInfoCard />
					<ContactsInfoCard />
					<SupportInfoCard />
				</section>
			</div>
		</main>
	);
}

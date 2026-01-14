import { DeliveryTimesTable } from "@/components/delivery/timetable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type DeliveryOption = {
	title: string;
};

const deliveryOptions: DeliveryOption[] = [
	{ title: "Курьерская служба СДЭК по России и странам СНГ" },
	{ title: "Самовывоз из магазина" },
	{ title: "Постаматы" },
	{ title: "Транспортная компания КИТ по России и странам СНГ" },
];

export default async function DeliveryPage() {
	return (
		<main className="mx-auto w-full max-w-7xl space-y-6">
			<header className="space-y-2">
				<h1 className="font-semibold text-xl tracking-tight md:text-2xl">
					Условия доставки
				</h1>
				<p className="text-muted-foreground text-sm leading-relaxed md:text-base">
					Наш интернет-магазин предлагает несколько вариантов доставки.
				</p>
			</header>

			<Card>
				<CardHeader className="space-y-2">
					<CardTitle className="text-base md:text-lg">
						Варианты доставки
					</CardTitle>
					<div className="flex flex-wrap gap-2">
						<Badge variant="secondary">Россия</Badge>
						<Badge variant="secondary">СНГ</Badge>
					</div>
				</CardHeader>
				<CardContent className="space-y-3">
					<ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed md:text-base">
						{deliveryOptions.map((item) => (
							<li key={item.title}>{item.title}</li>
						))}
					</ul>
				</CardContent>
			</Card>

			<Separator />

			<section className="space-y-3">
				<h2 className="font-semibold text-xl tracking-tight md:text-2xl">
					Доставка в другие города
				</h2>
				<p className="text-muted-foreground text-sm leading-relaxed md:text-base">
					В другие города мы отправляем транспортными компаниями{" "}
					<strong>СДЭК</strong> и <strong>КИТ</strong>. При отправке СДЭКом
					возможен наложенный платеж.
				</p>
			</section>

			<Separator />

			<section className="space-y-4">
				<div className="space-y-2">
					<h2 className="font-semibold text-xl tracking-tight md:text-2xl">
						Срок доставки
					</h2>
					<p className="text-muted-foreground text-sm leading-relaxed md:text-base">
						В зависимости от вашего региона проживания доставка занимает разное
						время.
					</p>
				</div>

				<DeliveryTimesTable />
			</section>
		</main>
	);
}

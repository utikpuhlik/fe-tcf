import { MapPin } from "lucide-react";

import { InfoCard } from "@/components/home/info-card";

const WORKING_HOURS = ["Пн–Сб: 09:00–19:00", "Вс: выходной"];

export function ContactsInfoCard() {
	return (
		<InfoCard icon={MapPin} title="Контакты" href="/contacts">
			<div className="space-y-3">
				<p>Севастополь</p>
				<p>ул. Хрусталёва, 74Ж</p>
				<div className="text-sm text-neutral-500">
					<p className="leading-7 font-medium text-neutral-700">График</p>
					{WORKING_HOURS.map((item) => (
						<p key={item}>{item}</p>
					))}
				</div>
			</div>
		</InfoCard>
	);
}

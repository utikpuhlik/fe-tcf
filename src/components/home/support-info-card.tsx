import { Headset } from "lucide-react";

import { InfoCard } from "@/components/home/info-card";

const MESSENGERS = [
	{
		label: "WhatsApp",
		href: "https://wa.me/79780661456",
		className: "bg-[#25D366] hover:bg-[#1ebe5a]",
		newTab: true,
	},
	{
		label: "Telegram",
		href: "https://t.me/Katyermy",
		className: "bg-[#229ED9] hover:bg-[#1a89bf]",
		newTab: true,
	},
	{
		label: "Viber",
		href: "viber://chat?number=%2B79780661456",
		className: "bg-[#7360F2] hover:bg-[#5b49d2]",
	},
];

const messengerBaseClasses =
	"w-full rounded-lg px-3 py-1 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white transition sm:w-auto";

export function SupportInfoCard() {
	return (
		<InfoCard icon={Headset} title="Помощь и консультации">
			<div className="space-y-3 text-neutral-600 text-sm leading-6 sm:text-base">
				<div className="flex flex-col gap-1">
					<span className="font-medium text-neutral-800">Телефоны</span>
					<a
						href="tel:+79780424666"
						className="flex w-fit rounded-full bg-neutral-900 px-3 py-1 font-semibold text-white text-xs uppercase tracking-[0.18em] transition hover:bg-neutral-700"
					>
						+7 (978) 042-46-66
					</a>
				</div>
				<div className="flex flex-col gap-1">
					<span className="font-medium text-neutral-800">Email</span>
					<a
						href="mailto:fordsevas@yandex.ru"
						className="w-fit text-neutral-600 underline decoration-neutral-400 decoration-dotted underline-offset-4 transition hover:text-neutral-900 hover:decoration-neutral-900"
					>
						fordsevas@yandex.ru
					</a>
				</div>
				<div className="flex flex-col gap-2">
					<span className="font-medium text-neutral-800">Мессенджеры</span>
					<div className="flex flex-wrap gap-2 sm:flex-nowrap">
						{MESSENGERS.map(({ label, href, className, newTab }) => (
							<a
								key={label}
								href={href}
								className={`${messengerBaseClasses} ${className}`}
								{...(newTab
									? { target: "_blank", rel: "noopener noreferrer" }
									: {})}
							>
								{label}
							</a>
						))}
					</div>
				</div>
			</div>
		</InfoCard>
	);
}

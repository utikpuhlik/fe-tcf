import { Truck } from "lucide-react";
import Image from "next/image";

import { InfoCard } from "@/components/home/info-card";

const DELIVERY_PARTNERS = [
	{ src: "/delivery/CDEK.svg", alt: "СДЭК", width: 84, height: 28 },
	{ src: "/delivery/kit.svg", alt: "КИТ", width: 72, height: 28 },
];

export function PaymentsInfoCard() {
	return (
		<InfoCard icon={Truck} title="Оплата и доставка" href="/payments">
			<div className="space-y-6">
				<p className="text-base leading-8">
					Самовывоз из пункта выдачи или доставка по всей России.
					<br />
					Партнёры: СДЭК и КИТ.
				</p>
				<div className="flex items-center gap-4">
					{DELIVERY_PARTNERS.map(({ src, alt, width, height }) => (
						<Image
							key={alt}
							src={src}
							alt={alt}
							width={width}
							height={height}
							className="h-7 w-auto"
						/>
					))}
				</div>
			</div>
		</InfoCard>
	);
}

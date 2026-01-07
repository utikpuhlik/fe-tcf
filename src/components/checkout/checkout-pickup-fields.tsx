"use client";

import { MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";

type PickupPoint = {
	title: string;
	subtitle: string;
};

type CheckoutPickupFieldsProps = {
	pickupPoint: PickupPoint;
};

const MAP_URL = "https://yandex.ru/maps/-/CLT0UGIv";

export function CheckoutPickupFields({
	pickupPoint,
}: CheckoutPickupFieldsProps) {
	return (
		<div className="space-y-3">
			<Label className="font-medium text-sm">Пункт самовывоза</Label>

			<div className="rounded-lg border p-4">
				<div className="flex items-start justify-between gap-3">
					<div>
						<div className="font-medium text-sm">{pickupPoint.title}</div>
						<div className="text-muted-foreground text-xs">
							{pickupPoint.subtitle}
						</div>
					</div>
					<a
						href={MAP_URL}
						target="_blank"
						rel="noreferrer"
						aria-label="Открыть магазин на карте"
						className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
					>
						<MapPin className="h-4 w-4" />
					</a>
				</div>
			</div>
		</div>
	);
}

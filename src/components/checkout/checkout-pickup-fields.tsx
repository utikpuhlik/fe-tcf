"use client";

import { Label } from "@/components/ui/label";

type PickupPoint = {
	title: string;
	subtitle: string;
};

type CheckoutPickupFieldsProps = {
	pickupPoint: PickupPoint;
};

export function CheckoutPickupFields({
	pickupPoint,
}: CheckoutPickupFieldsProps) {
	return (
		<div className="space-y-3">
			<Label className="font-medium text-sm">Пункт самовывоза</Label>

			<div className="rounded-lg border p-4">
				<div className="font-medium text-sm">{pickupPoint.title}</div>
				<div className="text-muted-foreground text-xs">
					{pickupPoint.subtitle}
				</div>
			</div>
		</div>
	);
}

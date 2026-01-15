"use client";

import { Badge } from "@/components/ui/badge";

interface StockBadgeProps {
	quantity: number;
}
type BadgeVariant = "error" | "attention" | "success";

function _getStockConfig(quantity: number): {
	variant: BadgeVariant;
	label: string;
} {
	if (quantity <= 0) {
		return { variant: "error", label: "Нет в наличии" };
	}
	if (quantity <= 2) {
		return { variant: "attention", label: `Есть в наличии: ${quantity}` };
	}
	return { variant: "success", label: `Есть в наличии: ${quantity}` };
}

export function StockBadge({ quantity }: StockBadgeProps) {
	const { variant, label } = _getStockConfig(quantity);

	return (
		<Badge variant={variant} className="font-normal">
			{label}
		</Badge>
	);
}

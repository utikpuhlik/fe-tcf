import { formatCurrency } from "@/lib/utils";

type CartTotalsProps = {
	subtotalRub: number;
	shippingRub?: number;
};

export function CartTotals({ subtotalRub, shippingRub = 0 }: CartTotalsProps) {
	const totalRub = subtotalRub + shippingRub;

	return (
		<div className="rounded-lg border p-3 text-sm">
			<div className="flex items-center justify-between">
				<span className="font-medium">Итого:</span>
				<span className="font-semibold">{formatCurrency(totalRub)}</span>
			</div>
		</div>
	);
}

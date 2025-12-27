import {
	BanIcon,
	BellPlus,
	CheckCircle,
	CheckCircle2,
	Package,
	Truck,
} from "lucide-react";
import type { JSX } from "react";
import { OrderBadge } from "@/components/orders/order-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	ORDER_STATUS_LABELS,
	type OrderStatusEnum,
} from "@/lib/schemas/commonSchema";
import { formatDateToLocal } from "@/lib/utils";

interface OrderProgressProps {
	status: OrderStatusEnum;
	updatedAt: string;
}

const progressStatuses: Exclude<OrderStatusEnum, "CANCELED">[] = [
	"NEW",
	"IN_PROGRESS",
	"SHIPPING",
	"COMPLETED",
];

const statusIcons: Record<Exclude<OrderStatusEnum, "CANCELED">, JSX.Element> = {
	NEW: <BellPlus className="size-5" />,
	IN_PROGRESS: <Package className="size-5" />,
	SHIPPING: <Truck className="size-5" />,
	COMPLETED: <CheckCircle className="size-5" />,
};

export function OrderProgressTracker({
	status,
	updatedAt,
}: OrderProgressProps) {
	if (status === "CANCELED") {
		return (
			<div className="flex items-center gap-2 text-destructive">
				<BanIcon className="size-5" />
				<OrderBadge orderStatus={status} />
			</div>
		);
	}

	const currentStepIndex = progressStatuses.indexOf(status);
	const progressValue =
		currentStepIndex === -1
			? 0
			: (currentStepIndex / (progressStatuses.length - 1)) * 100;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					Информация о доставке
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="relative space-y-6 pt-1">
					<div className="mb-2 flex items-center justify-between">
						{progressStatuses.map((step, index) => {
							const isCompleted = index < currentStepIndex;
							const isCurrent = index === currentStepIndex;

							const icon = isCompleted ? (
								<CheckCircle2 className="size-5" />
							) : (
								statusIcons[step]
							);

							const circleClass =
								isCompleted || isCurrent
									? "bg-green-600 text-white dark:bg-green-900"
									: "bg-muted border";

							return (
								<div key={step} className="text-center">
									<div
										className={`mx-auto flex size-12 items-center justify-center rounded-full text-lg ${circleClass}`}
									>
										{icon}
									</div>
									<div className="mt-2 text-xs">
										{ORDER_STATUS_LABELS[step]}
									</div>
								</div>
							);
						})}
					</div>
					<div className="space-y-6">
						<Progress
							className="w-full"
							value={progressValue}
							color="bg-green-200 dark:bg-green-800"
						/>
						<div className="flex items-center gap-2 text-muted-foreground text-sm">
							<OrderBadge orderStatus={status} />
							{formatDateToLocal(updatedAt, "ru-RU", false)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

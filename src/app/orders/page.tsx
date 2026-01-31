import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { OrderBadge } from "@/components/orders/order-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ordersApi } from "@/lib/api/orderApi";
import { formatCurrency, formatDateToLocal, generateMeta } from "@/lib/utils";
import { authGateWithRedirect } from "@/lib/utils/authGate";

export async function generateMetadata(): Promise<Metadata> {
	return generateMeta({
		title: "Заказы",
		description: "Список заказов пользователя",
		canonical: "/orders",
	});
}
export default async function OrdersPage() {
	const session = await authGateWithRedirect();

	const orders = await ordersApi.fetchByUserId(session.user.id);

	return (
		<main className="min-h-screen bg-neutral-50 text-neutral-900">
			<div className="mx-auto w-full max-w-5xl space-y-6">
				<header className="space-y-1">
					<h1 className="font-semibold text-2xl">Мои заказы</h1>
					<p className="text-neutral-600 text-sm">
						История ваших заказов и их статусы.
					</p>
				</header>

				{orders.items.length === 0 ? (
					<Card>
						<CardContent className="py-10 text-center text-neutral-600">
							У вас пока нет заказов.
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-4">
						{orders.items.map((order) => (
							<Card key={order.id}>
								<CardHeader className="flex flex-row items-center justify-between gap-4">
									<div>
										<CardTitle className="text-lg">Заказ {order.id}</CardTitle>
										<p className="text-neutral-600 text-sm">
											Создан{" "}
											{formatDateToLocal(order.created_at, "ru-RU", true)}
										</p>
									</div>
									<OrderBadge orderStatus={order.status} />
								</CardHeader>
								<CardContent className="flex flex-wrap items-center justify-between gap-4">
									<div className="text-neutral-600 text-sm">
										Сумма:{" "}
										<span className="font-medium text-neutral-900">
											{formatCurrency(order.total_sum)}
										</span>
									</div>
									<Link
										href={`/orders/${order.id}`}
										className="inline-flex items-center gap-1 font-medium text-sm hover:underline"
									>
										Подробности
										<ChevronRight className="size-4" />
									</Link>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</main>
	);
}

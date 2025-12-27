import { RedirectToSignIn } from "@daveyplate/better-auth-ui";
import { headers } from "next/headers";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { OrderBadge } from "@/components/orders/order-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ordersApi } from "@/lib/api/orderApi";
import { auth } from "@/lib/auth";
import { formatCurrency, formatDateToLocal } from "@/lib/utils";

export default async function OrdersPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return <RedirectToSignIn />;
	}

	const orders = await ordersApi.fetchByUserId(session.user.id);

	return (
		<main className="min-h-screen bg-neutral-50 px-6 py-12 text-neutral-900">
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
										className="inline-flex items-center gap-1  text-sm font-medium hover:underline"
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

import { CreditCard } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OrderProgressTracker } from "@/components/orders/order-progress-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ordersApi } from "@/lib/api/orderApi";
import type { OrderSchema } from "@/lib/schemas/orderSchema";
import { formatCurrency, formatDateToLocal } from "@/lib/utils";

type Props = {
	params: Promise<{ order_id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { order_id } = await params;
	const order: OrderSchema = await ordersApi.fetchById(order_id);

	return {
		title: `${order.id} | TCF`,
	};
}

export default async function Page({ params }: Props) {
	const { order_id } = await params;
	const order: OrderSchema = await ordersApi.fetchById(order_id);
	console.log(order);

	return (
		<div className="mx-auto max-w-screen-lg space-y-4 lg:mt-10">
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="font-display text-2xl">
							Заказ {order.id}
						</CardTitle>
						<p className="text-muted-foreground text-sm">
							Создан {formatDateToLocal(order.created_at, "ru-RU", true)}
						</p>
					</CardHeader>
					<CardContent>
						<Separator className="mb-4" />
						<div className="space-y-4">
							<div className="space-y-2">
								<h3 className="mb-1 font-semibold">Информация о клиенте</h3>
								{order.first_name} {order.last_name}
								<p>{order.email}</p>
								<p className="text-muted-foreground text-sm">
									{order.country}, {order.city}, {order.street}, {order.house}
								</p>
							</div>
							<div className="flex items-center justify-between space-y-2 rounded-md border bg-muted p-4">
								<div className="space-y-1">
									<h3 className="font-semibold">Способ оплаты</h3>
									<div className="flex items-center gap-2 text-muted-foreground text-sm">
										<CreditCard className="size-4" /> Visa ending in **** 1234
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Сводка заказа</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex justify-between">
							<span>Сумма</span>
							<span>{formatCurrency(order.total_sum)}</span>
						</div>
						<div className="flex justify-between">
							<span>Доставка</span>
							<span>{formatCurrency(10)}</span>
						</div>
						<Separator />
						<div className="flex justify-between font-semibold">
							<span>Итого</span>
							<span>{formatCurrency(order.total_sum + 10)}</span>
						</div>
					</CardContent>
				</Card>
			</div>

			<OrderProgressTracker
				status={order.status}
				updatedAt={order.updated_at}
			/>

			<Card>
				<CardHeader>
					<CardTitle>Состав заказа</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>№</TableHead>
								<TableHead>Код адреса</TableHead>
								<TableHead>Фото</TableHead>
								<TableHead>Система</TableHead>
								<TableHead>Подсистема</TableHead>
								<TableHead>Наименование</TableHead>
								<TableHead>Производитель</TableHead>
								<TableHead>Артикул производителя</TableHead>
								<TableHead>Кол-во</TableHead>
								<TableHead>Цена</TableHead>
								<TableHead>Сумма</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{order.order_offers.map((order_offer, index) => (
								<TableRow key={order_offer.id}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{order_offer.offer.sku}</TableCell>
									<TableCell>
										<div className="flex items-center gap-4">
											<Image
												src={order_offer.offer.image_url}
												width={60}
												height={60}
												alt=""
												unoptimized
											/>
										</div>
									</TableCell>
									<TableCell>
										<Link
											href={`/catalog/${order_offer.offer.product.sub_category.category.slug}`}
										>
											{order_offer.offer.product.sub_category.category.name}
										</Link>
									</TableCell>
									<TableCell>
										<Link
											href={`/catalog/${order_offer.offer.product.sub_category.category.slug}/${order_offer.offer.product.sub_category.slug}`}
										>
											{order_offer.offer.product.sub_category.name}
										</Link>
									</TableCell>
									<TableCell>
										<Link
											href={`/catalog/${order_offer.offer.product.sub_category.category.slug}/${order_offer.offer.product.sub_category.slug}/${order_offer.offer.product.id}`}
										>
											{order_offer.offer.product.name}
										</Link>
									</TableCell>
									<TableCell>{order_offer.brand}</TableCell>
									<TableCell>{order_offer.manufacturer_number}</TableCell>
									<TableCell>{order_offer.quantity}</TableCell>
									<TableCell>{formatCurrency(order_offer.price_rub)}</TableCell>
									<TableCell>
										{formatCurrency(
											order_offer.price_rub * order_offer.quantity,
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}

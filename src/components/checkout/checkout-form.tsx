"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Van } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { CheckoutContactFields } from "@/components/checkout/checkout-contact-fields";
import { CheckoutDeliveryFields } from "@/components/checkout/checkout-delivery-fields";
import { CheckoutPickupFields } from "@/components/checkout/checkout-pickup-fields";
import { useCartStore } from "@/components/layout/cart-store-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createOrderAction } from "@/lib/actions/orderAction";
import type { ShippingMethodEnum } from "@/lib/schemas/commonSchema";
import type { CheckoutSchema } from "@/lib/schemas/forms/checkoutSchema";
import { zCheckoutSchema } from "@/lib/schemas/forms/checkoutSchema";
import type { OrderWithOffersPostSchema } from "@/lib/schemas/orderSchema";
import { zOrderWithOffersPostSchema } from "@/lib/schemas/orderSchema";

export type CheckoutAutofill = {
	firstName?: string | null;
	lastName?: string | null;
	email?: string | null;
	phone?: string | null;
};

type CheckoutFormProps = {
	autofill?: CheckoutAutofill;
	userId?: string | null;
};

export function CheckoutForm({ autofill, userId }: CheckoutFormProps) {
	const [isPending, startTransition] = React.useTransition();
	const router = useRouter();
	const form = useForm<CheckoutSchema>({
		resolver: zodResolver(zCheckoutSchema),
		shouldUnregister: true,
		defaultValues: {
			method: "SELF_PICKUP",
			contact: {
				firstName: autofill?.firstName ?? "",
				lastName: autofill?.lastName ?? "",
				email: autofill?.email ?? "",
				phone: autofill?.phone ?? "",
			},
		},
		mode: "onBlur",
	});

	const method = useWatch({
		control: form.control,
		name: "method",
		defaultValue: "SELF_PICKUP",
	}) as ShippingMethodEnum;
	const cartItems = useCartStore((state) => state.items);
	const clearCart = useCartStore((state) => state.clear);

	const onSubmit = async (values: CheckoutSchema) => {
		const isDelivery = values.method === "CARGO";
		const delivery = values.delivery ?? null;
		const orderOffers = cartItems.map((item) => ({
			offer_id: item.id,
			brand: item.brand,
			manufacturer_number: item.manufacturer_number,
			quantity: item.quantity,
			price_rub: item.price_rub,
		}));

		const payload: OrderWithOffersPostSchema = {
			status: "NEW",
			note: null,
			address: isDelivery ? (delivery?.address ?? null) : null,
			country: isDelivery ? (delivery?.country ?? null) : null,
			city: isDelivery ? (delivery?.city ?? null) : null,
			shipping_method: values.method,
			shipping_company: isDelivery ? (delivery?.shippingCompany ?? null) : null,
			user_id: userId ?? null,
			first_name: values.contact.firstName,
			last_name: values.contact.lastName,
			email: values.contact.email,
			phone: values.contact.phone,
			order_offers: orderOffers,
		};

		let payloadValidated: OrderWithOffersPostSchema;
		try {
			payloadValidated = zOrderWithOffersPostSchema.parse(payload);
		} catch (_error) {
			toast("Проверьте данные заказа", {
				description: "Некоторые поля заполнены некорректно",
			});
			return;
		}

		startTransition(async () => {
			try {
				const createdOrder = await createOrderAction(payloadValidated);
				clearCart();
				router.replace(`/orders/${createdOrder.id}`);
			} catch (_error) {
				toast("Неизвестная ошибка", { description: "Что-то пошло не так.." });
			}
		});
	};

	return (
		<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
			<input type="hidden" {...form.register("method")} />
			<Card>
				<CardHeader className="space-y-2">
					<CardTitle className="text-xl">Оформление заказа</CardTitle>

					<Tabs
						value={method}
						onValueChange={(v) => {
							const nextMethod = v as ShippingMethodEnum;
							form.setValue("method", nextMethod, {
								shouldDirty: true,
							});
							if (nextMethod !== "CARGO") {
								form.setValue("delivery", undefined, {
									shouldDirty: true,
								});
								form.resetField("delivery.address");
								form.resetField("delivery.country");
								form.resetField("delivery.city");
								form.resetField("delivery.shippingCompany");
							}
						}}
					>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="SELF_PICKUP">
								<MapPin /> Самовывоз
							</TabsTrigger>
							<TabsTrigger value="CARGO">
								<Van />
								Доставка
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</CardHeader>

				<CardContent className="space-y-6">
					{/* CONTACT */}
					<CheckoutContactFields form={form} />

					<Separator />

					{/* PICKUP (default, not selectable) */}
					{method === "SELF_PICKUP" ? (
						<CheckoutPickupFields />
					) : (
						<CheckoutDeliveryFields form={form} method={method} />
					)}

					<div className="flex items-center gap-3">
						<LoadingButton
							type="submit"
							isLoading={isPending}
							disabled={cartItems.length === 0}
							className="w-full sm:w-auto"
						>
							Оформить заказ
						</LoadingButton>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}

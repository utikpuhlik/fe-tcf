"use client";

import { CreditCard, Minus, Package, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CartItem {
	id: string;
	name: string;
	price_rub: number;
	originalPrice?: number;
	quantity: number;
	image_url: string;
	color: string;
	size: string;
	stock: number;
}

export default function CartOverview() {
	const [items, setItems] = useState<CartItem[]>([
		{
			id: "1",
			name: "Classic Chronograph Watch",
			price_rub: 299.99,
			originalPrice: 399.99,
			quantity: 1,
			image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
			color: "Black",
			size: "Standard",
			stock: 5,
		},
		{
			id: "2",
			name: "Sport Diver Watch",
			price_rub: 199.99,
			quantity: 2,
			image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
			color: "Blue",
			size: "Standard",
			stock: 3,
		},
	]);

	const [_isExpanded, _setIsExpanded] = useState(true);

	const subtotal = items.reduce(
		(sum, item) => sum + item.price_rub * item.quantity,
		0,
	);
	const shipping = subtotal > 200 ? 0 : 5.99;
	const total = subtotal + shipping;

	const updateQuantity = (id: string, change: number) => {
		setItems((prev) =>
			prev.map((item) => {
				if (item.id === id) {
					const newQuantity = Math.max(
						1,
						Math.min(item.stock, item.quantity + change),
					);
					return { ...item, quantity: newQuantity };
				}
				return item;
			}),
		);
	};

	const removeItem = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	const _totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<div className="border-t p-4 pt-0">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{/* Cart Items */}
				<div className="md:col-span-2">
					<div className="max-h-[300px] space-y-3 overflow-y-auto">
						{items.map((item) => (
							<div
								key={item.id}
								className="flex gap-3 border-b py-3 last:border-0"
							>
								{/* Product Image */}
								<div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
									<Image
										src={item.image_url}
										alt={item.name}
										className="object-cover"
										sizes="64px"
									/>
								</div>

								{/* Product Details */}
								<div className="min-w-0 flex-1">
									<div className="flex justify-between">
										<div>
											<h3 className="truncate pr-6 font-medium text-sm">
												{item.name}
											</h3>
											<p className="text-muted-foreground text-xs">
												{item.color} • {item.size}
											</p>
										</div>
										<Button
											variant="ghost"
											size="icon"
											className="h-7 w-7"
											onClick={() => removeItem(item.id)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>

									<div className="mt-2 flex items-center justify-between">
										<div className="flex items-center gap-1">
											<Button
												variant="outline"
												size="icon"
												className="h-7 w-7"
												onClick={() => updateQuantity(item.id, -1)}
											>
												<Minus className="h-3 w-3" />
											</Button>
											<span className="w-7 text-center text-sm">
												{item.quantity}
											</span>
											<Button
												variant="outline"
												size="icon"
												className="h-7 w-7"
												onClick={() => updateQuantity(item.id, 1)}
											>
												<Plus className="h-3 w-3" />
											</Button>
										</div>

										<div className="text-right">
											<div className="font-medium text-sm">
												${(item.price_rub * item.quantity).toFixed(2)}
											</div>
											{item.originalPrice && (
												<div className="text-muted-foreground text-xs line-through">
													${(item.originalPrice * item.quantity).toFixed(2)}
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Order Summary */}
				<div className="space-y-4">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-lg">Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex justify-between text-sm">
								<span>Subtotal</span>
								<span>${subtotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Shipping</span>
								<span>
									{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
								</span>
							</div>
							<Separator />
							<div className="flex justify-between font-medium">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>

							<div className="mt-2 flex items-center gap-2 text-muted-foreground text-xs">
								<Package className="h-3 w-3" />
								<span>Free shipping on orders over $200</span>
							</div>
						</CardContent>
						<CardFooter>
							<Button className="w-full">
								<CreditCard className="mr-2 h-4 w-4" />
								<Link href={"/checkout"}>Оформить заказ</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}

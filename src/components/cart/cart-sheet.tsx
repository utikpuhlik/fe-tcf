"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { CartSummaryCard } from "@/components/cart/cart-summary-card";
import { useCartStore } from "@/components/layout/cart-store-provider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { OfferSchema } from "@/lib/schemas/offerSchema";

export function CartSheet() {
	const items = useCartStore((state) => state.items);
	const remove = useCartStore((state) => state.remove);
	const clear = useCartStore((state) => state.clear);
	const increment = useCartStore((state) => state.increment);
	const decrement = useCartStore((state) => state.decrement);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="relative h-11 w-11 rounded-full sm:h-10 sm:w-10"
					aria-label="Открыть корзину"
				>
					<ShoppingCart className="h-5 w-5" />
					{items.length > 0 && (
						<span className="-right-2 -top-2 absolute flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
							{items.length}
						</span>
					)}
				</Button>
			</SheetTrigger>

			<SheetContent className="flex h-dvh w-full flex-col px-4 sm:max-w-lg md:px-6">
				<SheetHeader>
					<SheetTitle>Корзина</SheetTitle>
					<SheetDescription>
						{items.length} {items.length === 1 ? "товар" : "товаров"} в корзине
					</SheetDescription>
				</SheetHeader>

				{/* важно: flex-1 чтобы футер прижимался вниз */}
				<ScrollArea className="mt-4 min-h-0 flex-1 pr-2">
					<div className="space-y-4">
						{items.map((item: OfferSchema) => (
							<CartItemCard
								key={item.id}
								offer={item}
								onIncrement={increment}
								onDecrement={decrement}
								onRemove={remove}
							/>
						))}
					</div>
				</ScrollArea>

				{/* свой футер вместо SheetFooter */}
				<div className="mt-4 space-y-4 border-t pt-4 pb-4">
					<CartSummaryCard
						total_sum_retail={items.reduce(
							(s, i) => s + i.price_rub * i.quantity,
							0,
						)}
						total_sum_wholesale={items.reduce(
							(s, i) => s + i.wholesale_price_rub * i.quantity,
							0,
						)}
						total_sum_super_wholesale={items.reduce(
							(s, i) => s + i.super_wholesale_price_rub * i.quantity,
							0,
						)}
					/>

					<div className="flex items-center gap-3">
						<div className="flex flex-1 gap-3">
							<SheetClose asChild>
								<Link href="/checkout">
									<Button>Перейти к оформлению заказа</Button>
								</Link>
							</SheetClose>
						</div>
						<Button
							variant="secondary"
							size="icon"
							onClick={clear}
							disabled={items.length === 0}
							aria-label="Очистить корзину"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

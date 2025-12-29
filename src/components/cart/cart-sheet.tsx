"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { CartItem } from "@/components/cart/cart-item";
import { CartTotals } from "@/components/cart/cart-totals";
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
import type { CartItem as CartItemType } from "@/lib/stores/useCartStore";

export function CartSheet() {
	const items = useCartStore((state) => state.items);
	const remove = useCartStore((state) => state.remove);
	const clear = useCartStore((state) => state.clear);
	const increment = useCartStore((state) => state.increment);
	const decrement = useCartStore((state) => state.decrement);
	const subtotalRub = items.reduce(
		(total, item) => total + item.price_rub * item.quantity,
		0,
	);

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
						{items.map((item: CartItemType) => (
							<CartItem
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
					<CartTotals subtotalRub={subtotalRub} />

					<div className="flex items-center gap-3">
						<SheetClose asChild>
							<Link href="/checkout" className="flex-1">
								<Button className="w-full">Перейти к оформлению заказа</Button>
							</Link>
						</SheetClose>
						<Button
							variant="outline"
							className="flex-1"
							onClick={clear}
							disabled={items.length === 0}
							aria-label="Очистить корзину"
						>
							Очистить корзину
							<Trash2 />
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { env } from "@/env";
import type { OfferSchema } from "@/lib/schemas/offerSchema";

export type CartItem = OfferSchema & {
	quantity: number;
	stock_quantity?: number;
	has_cart_mismatch?: boolean;
};

export type CartState = {
	items: CartItem[];
};

export type CartItemInput = OfferSchema & {
	has_cart_mismatch?: boolean;
};

export type CartActions = {
	add: (item: CartItemInput, quantity?: number) => void;
	remove: (id: string) => void;
	clear: () => void;
	increment: (id: string) => void;
	decrement: (id: string) => void;
};

export type CartStore = CartState & CartActions;

export const createCartStore = () =>
	createStore<CartStore>()(
		persist(
			(set) => ({
				items: [],
				add: (item, quantity = 1) =>
					set((state) => {
						const stock: number = Math.max(0, item.quantity);
						if (stock <= 0) return state;

						const exists = state.items.find((i) => i.id === item.id);
						const currentInCart: number = exists?.quantity ?? 0;
						const desired: number = currentInCart + quantity;
						const nextQty: number = Math.min(desired, stock);

						// ничего не меняем, если уже упёрлись в лимит
						if (nextQty === currentInCart) return state;

						if (exists) {
							return {
								items: state.items.map((i) =>
									i.id === item.id
										? {
												...i,
												// обновим снапшот оффера на случай смены цен/картинки
												...item,
												quantity: nextQty,
												stock_quantity: stock,
											}
										: i,
								),
							};
						}

						return {
							items: [
								...state.items,
								{ ...item, quantity: nextQty, stock_quantity: stock },
							],
						};
					}),
				remove: (id) =>
					set((state) => ({
						items: state.items.filter((i) => i.id !== id),
					})),
				clear: () => set({ items: [] }),
				increment: (id) =>
					set((state) => ({
						items: state.items.map((i) => {
							if (i.id !== id) return i;

							const stock =
								typeof i.stock_quantity === "number" ? i.stock_quantity : null;
							if (stock && stock > 0 && i.quantity >= stock) return i;

							return { ...i, quantity: i.quantity + 1 };
						}),
					})),
				decrement: (id) =>
					set((state) => ({
						items: state.items
							.map((i) =>
								i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
							)
							.filter((i) => i.quantity > 0),
					})),
			}),
			{
				name: env.NEXT_PUBLIC_CART_STORAGE_KEY, // ключ в localStorage
			},
		),
	);

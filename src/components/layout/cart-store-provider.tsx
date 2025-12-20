"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useRef,
} from "react";
import { useStore } from "zustand";
import { env } from "@/env";
import { type CartStore, createCartStore } from "@/lib/stores/useCartStore";

export type CartStoreApi = ReturnType<typeof createCartStore>;

export const CartStoreContext = createContext<CartStoreApi | undefined>(
	undefined,
);

export const CartStoreProvider = ({ children }: { children: ReactNode }) => {
	const storeRef = useRef<CartStoreApi | null>(null);
	if (!storeRef.current) {
		storeRef.current = createCartStore();
	}

	useEffect(() => {
		const store = storeRef.current;
		if (!store || typeof window === "undefined") return;

		const rehydrate = () => store.persist.rehydrate();
		const handleStorage = (event: StorageEvent) => {
			if (event.key === env.NEXT_PUBLIC_CART_STORAGE_KEY) {
				rehydrate();
			}
		};

		rehydrate();
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);

	return (
		<CartStoreContext.Provider value={storeRef.current}>
			{children}
		</CartStoreContext.Provider>
	);
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
	const store = useContext(CartStoreContext);
	if (!store) {
		throw new Error("useCartStore must be used within a CartStoreProvider");
	}

	return useStore(store, selector);
};

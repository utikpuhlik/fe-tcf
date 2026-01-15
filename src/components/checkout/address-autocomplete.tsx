"use client";

import * as React from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ShippingMethodEnum } from "@/lib/schemas/commonSchema";
import type { CheckoutSchema } from "@/lib/schemas/forms/checkoutSchema";

type Suggestion = {
	label: string;
	value: string;
};

type AddressAutocompleteProps = {
	form: UseFormReturn<CheckoutSchema>;
	method: ShippingMethodEnum;
};

export function AddressAutocomplete({
	form,
	method,
}: AddressAutocompleteProps) {
	const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [lookupError, setLookupError] = React.useState<string | null>(null);
	const skipNextLookupRef = React.useRef(false);
	const suggestionsRef = React.useRef<HTMLDivElement | null>(null);

	const addressQuery: string =
		useWatch({ control: form.control, name: "delivery.address" }) ?? "";

	React.useEffect(() => {
		if (method !== "CARGO") return;
		if (skipNextLookupRef.current) {
			skipNextLookupRef.current = false;
			return;
		}

		if (!addressQuery.trim()) {
			setSuggestions([]);
			setLookupError(null);
			return;
		}

		const controller: AbortController = new AbortController();
		const timeout: number = window.setTimeout(async () => {
			setIsLoading(true);
			try {
				const res: Response = await fetch(
					`/api/geocode?q=${encodeURIComponent(addressQuery)}&limit=5`,
					{ signal: controller.signal },
				);

				if (!res.ok) throw new Error("Lookup failed");

				const data: unknown = await res.json();
				const next: Suggestion[] =
					typeof data === "object" &&
					data !== null &&
					"suggestions" in data &&
					Array.isArray((data as { suggestions: unknown }).suggestions)
						? ((data as { suggestions: Suggestion[] }).suggestions ?? [])
						: [];

				setSuggestions(next);
				setLookupError(null);
			} catch (e) {
				if (controller.signal.aborted) return;
				console.error(e);
				setSuggestions([]);
				setLookupError("Не удалось получить подсказки");
			} finally {
				if (!controller.signal.aborted) setIsLoading(false);
			}
		}, 300);

		return () => {
			controller.abort();
			window.clearTimeout(timeout);
		};
	}, [addressQuery, method]);

	const handleSelectSuggestion = (s: Suggestion) => {
		skipNextLookupRef.current = true;
		form.setValue("delivery.address", s.value, {
			shouldDirty: true,
			shouldValidate: true,
		});
		setSuggestions([]);
	};

	if (method !== "CARGO") return null;

	return (
		<div className="space-y-2">
			<Input
				id="address"
				placeholder="Адрес пункта выдачи"
				autoComplete="street-address"
				{...form.register("delivery.address")}
				onBlur={(event) => {
					if (
						suggestionsRef.current &&
						event.relatedTarget instanceof Node &&
						suggestionsRef.current.contains(event.relatedTarget)
					) {
						return;
					}
					setSuggestions([]);
				}}
			/>

			{isLoading ? (
				<p className="text-muted-foreground text-xs">Ищем адрес…</p>
			) : null}
			{lookupError ? (
				<p className="text-destructive text-xs">{lookupError}</p>
			) : null}

			{suggestions.length > 0 ? (
				<Card className="w-full max-w-full gap-0 border-dashed py-0">
					<CardContent className="w-full p-2" ref={suggestionsRef}>
						<ScrollArea className="h-48 w-full">
							<div className="grid w-full gap-1">
								{suggestions.map((s) => (
									<Button
										key={s.value}
										type="button"
										variant="ghost"
										className="h-auto w-full justify-start whitespace-normal px-3 py-2 text-left"
										onClick={() => handleSelectSuggestion(s)}
									>
										<div className="min-w-0 text-left">
											<div className="wrap-break-word font-medium text-sm">
												{s.label}
											</div>
										</div>
									</Button>
								))}
							</div>
						</ScrollArea>
					</CardContent>
				</Card>
			) : null}

			{form.formState.errors.delivery?.address?.message ? (
				<p className="text-destructive text-xs">
					{form.formState.errors.delivery.address.message}
				</p>
			) : null}
		</div>
	);
}

"use client";

import * as React from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import type {
	CheckoutSchema,
	DeliveryMethod,
} from "@/lib/schemas/forms/checkoutSchema";

type Suggestion = {
	label: string;
	value: string;
	position?: { lon: number; lat: number };
	country?: string;
	city?: string;
	street?: string;
	houseNumber?: string;
	addressLine1?: string;
	postalCode?: string;
};

type CheckoutDeliveryFieldsProps = {
	form: UseFormReturn<CheckoutSchema>;
	method: DeliveryMethod;
};

export function CheckoutDeliveryFields({
	form,
	method,
}: CheckoutDeliveryFieldsProps) {
	const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [lookupError, setLookupError] = React.useState<string | null>(null);
	const skipNextLookupRef = React.useRef(false);
	const suggestionsRef = React.useRef<HTMLDivElement | null>(null);

	const addressQuery: string =
		useWatch({ control: form.control, name: "delivery.addressQuery" }) ?? "";

	React.useEffect(() => {
		if (method !== "delivery") return;
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
		form.setValue("delivery.addressQuery", s.value, {
			shouldDirty: true,
			shouldValidate: true,
		});
		form.setValue("delivery.country", s.country ?? "", { shouldDirty: true });
		form.setValue("delivery.city", s.city ?? "", { shouldDirty: true });
		form.setValue("delivery.street", s.street ?? "", { shouldDirty: true });

		const houseFromLine: string =
			s.houseNumber ?? s.addressLine1?.replace(s.street ?? "", "").trim() ?? "";

		form.setValue("delivery.houseNumber", houseFromLine, { shouldDirty: true });
		form.setValue("delivery.postalCode", s.postalCode ?? "", {
			shouldDirty: true,
		});

		setSuggestions([]);
	};

	if (method !== "delivery") return null;

	return (
		<div className="space-y-4">
			<Label className="font-medium text-sm">Адрес доставки</Label>

			<div className="space-y-2">
				<Input
					id="addressSearch"
					placeholder="Начните вводить адрес — подсказки появятся ниже"
					autoComplete="street-address"
					{...form.register("delivery.addressQuery")}
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
												<div className="break-words font-medium text-sm">
													{s.label}
												</div>
												<div className="text-muted-foreground text-xs">
													{s.city ?? "Город"} • {s.country ?? "Страна"}
												</div>
											</div>
										</Button>
									))}
								</div>
							</ScrollArea>
						</CardContent>
					</Card>
				) : null}

				{form.formState.errors.delivery?.addressQuery?.message ? (
					<p className="text-destructive text-xs">
						{form.formState.errors.delivery.addressQuery.message}
					</p>
				) : null}
			</div>

			<div className="grid gap-4 md:grid-cols-12">
				<Field className="md:col-span-6">
					<FieldLabel htmlFor="country">Страна</FieldLabel>
					<FieldContent>
						<select
							id="country"
							autoComplete="country-name"
							className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
							{...form.register("delivery.country")}
						>
							<option value="">Выберите страну</option>
							<option value="Россия">Россия</option>
							<option value="Беларусь">Беларусь</option>
							<option value="Армения">Армения</option>
							<option value="Казахстана">Казахстана</option>
							<option value="Турция">Турция</option>
						</select>
						{form.formState.errors.delivery?.country?.message ? (
							<p className="text-destructive text-xs">
								{form.formState.errors.delivery.country.message}
							</p>
						) : null}
					</FieldContent>
				</Field>

				<Field className="md:col-span-6">
					<FieldLabel htmlFor="city">Город</FieldLabel>
					<FieldContent>
						<Input
							id="city"
							autoComplete="address-level2"
							{...form.register("delivery.city")}
							placeholder="Москва"
						/>
						{form.formState.errors.delivery?.city?.message ? (
							<p className="text-destructive text-xs">
								{form.formState.errors.delivery.city.message}
							</p>
						) : null}
					</FieldContent>
				</Field>

				<Field className="md:col-span-6">
					<FieldLabel htmlFor="street">Улица</FieldLabel>
					<FieldContent>
						<Input
							id="street"
							autoComplete="address-line1"
							{...form.register("delivery.street")}
							placeholder="Красная площадь"
						/>
						{form.formState.errors.delivery?.street?.message ? (
							<p className="text-destructive text-xs">
								{form.formState.errors.delivery.street.message}
							</p>
						) : null}
					</FieldContent>
				</Field>

				<div className="grid gap-4 md:col-span-6 md:grid-cols-2">
					<Field>
						<FieldLabel htmlFor="houseNumber">Дом</FieldLabel>
						<FieldContent>
							<Input
								id="houseNumber"
								autoComplete="address-line2"
								{...form.register("delivery.houseNumber")}
								placeholder="1"
							/>
							{form.formState.errors.delivery?.houseNumber?.message ? (
								<p className="text-destructive text-xs">
									{form.formState.errors.delivery.houseNumber.message}
								</p>
							) : null}
						</FieldContent>
					</Field>

					<Field>
						<FieldLabel htmlFor="postalCode">Индекс</FieldLabel>
						<FieldContent>
							<Input
								id="postalCode"
								autoComplete="postal-code"
								{...form.register("delivery.postalCode")}
								placeholder="000000"
							/>
							{form.formState.errors.delivery?.postalCode?.message ? (
								<p className="text-destructive text-xs">
									{form.formState.errors.delivery.postalCode.message}
								</p>
							) : null}
						</FieldContent>
					</Field>
				</div>
			</div>
		</div>
	);
}

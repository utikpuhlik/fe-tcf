"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

type CheckoutFormState = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	country: string;
	city: string;
	street: string;
	houseNumber: string;
};

const initialForm: CheckoutFormState = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	country: "",
	city: "",
	street: "",
	houseNumber: "",
};

export function CheckoutForm() {
	const [form, setForm] = useState<CheckoutFormState>(initialForm);
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!query.trim()) {
			setSuggestions([]);
			setError(null);
			return;
		}

		const controller = new AbortController();
		const timeout = setTimeout(async () => {
			setIsLoading(true);
			try {
				const res = await fetch(
					`/api/geocode?q=${encodeURIComponent(query)}&limit=5`,
					{ signal: controller.signal },
				);

				if (!res.ok) {
					throw new Error("Lookup failed");
				}

				const data = await res.json();
				setSuggestions(
					Array.isArray(data?.suggestions) ? data.suggestions : [],
				);
				setError(null);
			} catch (lookupError) {
				if (controller.signal.aborted) return;
				console.error(lookupError);
				setSuggestions([]);
				setError("Не удалось получить подсказки");
			} finally {
				if (!controller.signal.aborted) {
					setIsLoading(false);
				}
			}
		}, 300);

		return () => {
			controller.abort();
			clearTimeout(timeout);
		};
	}, [query]);

	const handleSelect = (suggestion: Suggestion) => {
		setForm((prev) => ({
			...prev,
			country: suggestion.country ?? prev.country,
			city: suggestion.city ?? prev.city,
			street: suggestion.street ?? prev.street,
			houseNumber:
				suggestion.houseNumber ??
				suggestion.addressLine1?.replace(suggestion.street ?? "", "").trim() ??
				prev.houseNumber,
		}));
		setQuery(suggestion.value);
		setSuggestions([]);
	};

	const updateField =
		<Key extends keyof CheckoutFormState>(key: Key) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setForm((prev) => ({ ...prev, [key]: event.target.value }));
		};

	return (
		<section className="space-y-8">
			<div className="grid gap-6 md:grid-cols-2">
				<Field>
					<FieldLabel htmlFor="firstName">Имя</FieldLabel>
					<FieldContent>
						<Input
							id="firstName"
							value={form.firstName}
							onChange={updateField("firstName")}
							placeholder="Иван"
							autoComplete="given-name"
						/>
					</FieldContent>
				</Field>
				<Field>
					<FieldLabel htmlFor="lastName">Фамилия</FieldLabel>
					<FieldContent>
						<Input
							id="lastName"
							value={form.lastName}
							onChange={updateField("lastName")}
							placeholder="Иванов"
							autoComplete="family-name"
						/>
					</FieldContent>
				</Field>
				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<FieldContent>
						<Input
							id="email"
							type="email"
							value={form.email}
							onChange={updateField("email")}
							placeholder="you@example.com"
							autoComplete="email"
						/>
					</FieldContent>
				</Field>
				<Field>
					<FieldLabel htmlFor="phone">Телефон</FieldLabel>
					<FieldContent>
						<Input
							id="phone"
							type="tel"
							value={form.phone}
							onChange={updateField("phone")}
							placeholder="+7 999 123-45-67"
							autoComplete="tel"
						/>
					</FieldContent>
				</Field>
			</div>

			<div className="space-y-3">
				<Label htmlFor="addressSearch">Адрес доставки</Label>
				<Input
					id="addressSearch"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder="Начните вводить адрес — подсказки появятся ниже"
					autoComplete="street-address"
				/>
				<p className="text-muted-foreground text-sm">
					При выборе подсказки страна, город и адрес заполнятся автоматически.
				</p>

				<div className="space-y-2">
					{isLoading ? (
						<p className="text-muted-foreground text-sm">Ищем адрес…</p>
					) : null}
					{error ? <p className="text-destructive text-sm">{error}</p> : null}
					{suggestions.length > 0 ? (
						<ul className="divide-y divide-border rounded-lg border">
							{suggestions.map((suggestion) => (
								<li key={suggestion.value}>
									<button
										type="button"
										onClick={() => handleSelect(suggestion)}
										className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left text-sm transition hover:bg-muted focus:bg-muted focus:outline-none"
									>
										<div className="space-y-1">
											<p className="font-medium">{suggestion.label}</p>
											<div className="text-muted-foreground text-xs">
												{suggestion.city ?? "Город не найден"} •{" "}
												{suggestion.country ?? "Страна не найдена"}
											</div>
										</div>
										{suggestion.position ? (
											<span className="text-[11px] text-muted-foreground uppercase tracking-wide">
												{suggestion.position.lat}, {suggestion.position.lon}
											</span>
										) : null}
									</button>
								</li>
							))}
						</ul>
					) : query.trim() && !isLoading && !error ? (
						<p className="text-muted-foreground text-sm">
							Нет подсказок для этого запроса.
						</p>
					) : null}
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Field>
					<FieldLabel htmlFor="country">Страна</FieldLabel>
					<FieldContent>
						<Input
							id="country"
							value={form.country}
							onChange={updateField("country")}
							placeholder="Россия"
							autoComplete="country-name"
						/>
					</FieldContent>
				</Field>
				<Field>
					<FieldLabel htmlFor="city">Город</FieldLabel>
					<FieldContent>
						<Input
							id="city"
							value={form.city}
							onChange={updateField("city")}
							placeholder="Москва"
							autoComplete="address-level2"
						/>
					</FieldContent>
				</Field>
				<Field>
					<FieldLabel htmlFor="street">Улица</FieldLabel>
					<FieldContent>
						<Input
							id="street"
							value={form.street}
							onChange={updateField("street")}
							placeholder="Улица"
							autoComplete="address-line1"
						/>
					</FieldContent>
				</Field>
				<Field>
					<FieldLabel htmlFor="houseNumber">Дом / кв.</FieldLabel>
					<FieldContent>
						<Input
							id="houseNumber"
							value={form.houseNumber}
							onChange={updateField("houseNumber")}
							placeholder="55, кв. 12"
							autoComplete="address-line2"
						/>
					</FieldContent>
				</Field>
			</div>

			<div className="flex items-center gap-3">
				<Button type="button">Сохранить адрес</Button>
				<p className="text-muted-foreground text-sm">
					Сохранение не отправляет заказ — это демо формы.
				</p>
			</div>
		</section>
	);
}

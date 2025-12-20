"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Van } from "lucide-react";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
	CheckoutSchema,
	DeliveryMethod,
} from "@/lib/schemas/forms/checkoutSchema";
import { zCheckoutSchema } from "@/lib/schemas/forms/checkoutSchema";

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

export type CheckoutAutofill = {
	firstName?: string | null;
	lastName?: string | null;
	email?: string | null;
	phone?: string | null;
};

type CheckoutFormProps = {
	autofill?: CheckoutAutofill;
};

const DEFAULT_PICKUP_POINT = {
	id: "pickup-sevastopol-khrustaleva-74zh",
	title: "Россия, Севастополь",
	subtitle: "Хрусталева 74ж",
} as const;

export function CheckoutForm({ autofill }: CheckoutFormProps) {
	const form = useForm<CheckoutSchema>({
		resolver: zodResolver(zCheckoutSchema),
		defaultValues: {
			method: "delivery",
			contact: {
				firstName: autofill?.firstName ?? "",
				lastName: autofill?.lastName ?? "",
				email: autofill?.email ?? "",
				phone: autofill?.phone ?? "",
			},
			delivery: {
				addressQuery: "",
				country: "",
				city: "",
				street: "",
				houseNumber: "",
				postalCode: "",
			},
			pickup: {
				pickupPointId: DEFAULT_PICKUP_POINT.id,
			},
		},
		mode: "onBlur",
	});

	const method: DeliveryMethod = useWatch({
		control: form.control,
		name: "method",
	});

	const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [lookupError, setLookupError] = React.useState<string | null>(null);

	const addressQuery: string =
		useWatch({ control: form.control, name: "delivery.addressQuery" }) ?? "";

	React.useEffect(() => {
		if (method !== "delivery") return;

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

	const onSubmit = async (values: CheckoutSchema) => {
		console.log("checkout submit", values);
	};

	return (
		<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
			<Card>
				<CardHeader className="space-y-2">
					<CardTitle className="text-xl">Оформление заказа</CardTitle>

					<Tabs
						value={method}
						onValueChange={(v) => {
							const nextMethod = v as DeliveryMethod;
							form.setValue("method", nextMethod, {
								shouldDirty: true,
							});
							setSuggestions([]);
							setLookupError(null);
							if (nextMethod !== "delivery") {
								form.resetField("delivery.addressQuery");
								form.resetField("delivery.country");
								form.resetField("delivery.city");
								form.resetField("delivery.street");
								form.resetField("delivery.houseNumber");
								form.resetField("delivery.postalCode");
							}
						}}
					>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="pickup">
								<MapPin /> Самовывоз
							</TabsTrigger>
							<TabsTrigger value="delivery">
								<Van />
								Доставка
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</CardHeader>

				<CardContent className="space-y-6">
					{/* CONTACT */}
					<div className="space-y-4">
						<Label className="font-medium text-sm">Контактные данные</Label>
						<div className="grid gap-4 md:grid-cols-2">
							<Field>
								<FieldLabel htmlFor="firstName">Имя</FieldLabel>
								<FieldContent>
									<Input
										id="firstName"
										autoComplete="given-name"
										{...form.register("contact.firstName")}
										placeholder="Кирилл"
									/>
									{form.formState.errors.contact?.firstName?.message ? (
										<p className="text-destructive text-xs">
											{form.formState.errors.contact.firstName.message}
										</p>
									) : null}
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="lastName">Фамилия</FieldLabel>
								<FieldContent>
									<Input
										id="lastName"
										autoComplete="family-name"
										{...form.register("contact.lastName")}
										placeholder="Иванов"
									/>
									{form.formState.errors.contact?.lastName?.message ? (
										<p className="text-destructive text-xs">
											{form.formState.errors.contact.lastName.message}
										</p>
									) : null}
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<FieldContent>
									<Input
										id="email"
										type="email"
										autoComplete="email"
										{...form.register("contact.email")}
										placeholder="example@mail.com"
									/>
									{form.formState.errors.contact?.email?.message ? (
										<p className="text-destructive text-xs">
											{form.formState.errors.contact.email.message}
										</p>
									) : null}
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="phone">Телефон</FieldLabel>
								<FieldContent>
									<Input
										id="phone"
										type="tel"
										autoComplete="tel"
										{...form.register("contact.phone")}
										placeholder="+79780424666"
									/>
									{form.formState.errors.contact?.phone?.message ? (
										<p className="text-destructive text-xs">
											{form.formState.errors.contact.phone.message}
										</p>
									) : null}
								</FieldContent>
							</Field>
						</div>
					</div>

					<Separator />

					{/* PICKUP (default, not selectable) */}
					{method === "pickup" ? (
						<div className="space-y-3">
							<Label className="font-medium text-sm">Пункт самовывоза</Label>

							<div className="rounded-lg border p-4">
								<div className="font-medium text-sm">
									{DEFAULT_PICKUP_POINT.title}
								</div>
								<div className="text-muted-foreground text-xs">
									{DEFAULT_PICKUP_POINT.subtitle}
								</div>
							</div>
						</div>
					) : null}

					{/* DELIVERY */}
					{method === "delivery" ? (
						<div className="space-y-4">
							<Label className="font-medium text-sm">Адрес доставки</Label>

							<div className="space-y-2">
								<Input
									id="addressSearch"
									placeholder="Начните вводить адрес — подсказки появятся ниже"
									autoComplete="street-address"
									{...form.register("delivery.addressQuery")}
								/>

								{isLoading ? (
									<p className="text-muted-foreground text-xs">Ищем адрес…</p>
								) : null}
								{lookupError ? (
									<p className="text-destructive text-xs">{lookupError}</p>
								) : null}

								{suggestions.length > 0 ? (
									<Card className="border-dashed">
										<CardContent className="p-2">
											<ScrollArea className="h-48">
												<div className="grid gap-1">
													{suggestions.map((s) => (
														<Button
															key={s.value}
															type="button"
															variant="ghost"
															className="h-auto justify-start px-3 py-2"
															onClick={() => handleSelectSuggestion(s)}
														>
															<div className="text-left">
																<div className="font-medium text-sm">
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

							<div className="grid gap-4 md:grid-cols-2">
								<Field>
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

								<Field>
									<FieldLabel htmlFor="city">Город</FieldLabel>
									<FieldContent>
										<Input
											id="city"
											autoComplete="address-level2"
											{...form.register("delivery.city")}
											placeholder="Севастополь"
										/>
										{form.formState.errors.delivery?.city?.message ? (
											<p className="text-destructive text-xs">
												{form.formState.errors.delivery.city.message}
											</p>
										) : null}
									</FieldContent>
								</Field>

								<Field>
									<FieldLabel htmlFor="street">Улица</FieldLabel>
									<FieldContent>
										<Input
											id="street"
											autoComplete="address-line1"
											{...form.register("delivery.street")}
											placeholder="Хрусталёва"
										/>
										{form.formState.errors.delivery?.street?.message ? (
											<p className="text-destructive text-xs">
												{form.formState.errors.delivery.street.message}
											</p>
										) : null}
									</FieldContent>
								</Field>

								<Field>
									<FieldLabel htmlFor="houseNumber">Дом</FieldLabel>
									<FieldContent>
										<Input
											id="houseNumber"
											autoComplete="address-line2"
											{...form.register("delivery.houseNumber")}
											placeholder="74ж"
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
					) : null}

					<div className="flex items-center gap-3">
						<Button type="submit">Продолжить</Button>
						<p className="text-muted-foreground text-sm">
							Пока просто валидируем форму (демо).
						</p>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}

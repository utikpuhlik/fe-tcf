"use client";

import { Info } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { AddressAutocomplete } from "@/components/checkout/address-autocomplete";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ShippingMethodEnum } from "@/lib/schemas/commonSchema";
import {
	SHIPPING_COMPANY_LABELS,
	SHIPPING_COUNTRY_LABELS,
	zShippingCompanyEnum,
	zShippingCountryEnum,
} from "@/lib/schemas/commonSchema";
import type { CheckoutSchema } from "@/lib/schemas/forms/checkoutSchema";

type CheckoutDeliveryFieldsProps = {
	form: UseFormReturn<CheckoutSchema>;
	method: ShippingMethodEnum;
};

export function CheckoutDeliveryFields({
	form,
	method,
}: CheckoutDeliveryFieldsProps) {
	if (method !== "CARGO") return null;

	return (
		<div className="space-y-4">
			<Field>
				<FieldLabel className="flex items-center gap-2">
					Укажите адрес удобного для Вас пункта выдачи СДЭК или КИТ
					<Tooltip>
						<TooltipTrigger asChild>
							<Info className="h-4 w-4" />
						</TooltipTrigger>
						<TooltipContent>
							<p>Жду текст</p>
						</TooltipContent>
					</Tooltip>
				</FieldLabel>
				<FieldContent>
					<AddressAutocomplete form={form} method={method} />
				</FieldContent>
			</Field>

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
							{zShippingCountryEnum.options.map((country) => (
								<option key={country} value={country}>
									{SHIPPING_COUNTRY_LABELS[country]}
								</option>
							))}
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
					<FieldLabel htmlFor="shippingCompany">
						Транспортная компания
					</FieldLabel>
					<FieldContent>
						<select
							id="shippingCompany"
							autoComplete="organization"
							className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
							{...form.register("delivery.shippingCompany")}
						>
							<option value="">Выберите транспортную компанию</option>
							{zShippingCompanyEnum.options.map((company) => (
								<option key={company} value={company}>
									{SHIPPING_COMPANY_LABELS[company]}
								</option>
							))}
						</select>
						{form.formState.errors.delivery?.shippingCompany?.message ? (
							<p className="text-destructive text-xs">
								{form.formState.errors.delivery.shippingCompany.message}
							</p>
						) : null}
					</FieldContent>
				</Field>
			</div>
		</div>
	);
}

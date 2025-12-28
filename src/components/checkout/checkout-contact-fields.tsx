"use client";

import Link from "next/link";
import type { UseFormReturn } from "react-hook-form";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CheckoutSchema } from "@/lib/schemas/forms/checkoutSchema";

type CheckoutContactFieldsProps = {
	form: UseFormReturn<CheckoutSchema>;
	showLoginHint?: boolean;
};

export function CheckoutContactFields({
	form,
	showLoginHint,
}: CheckoutContactFieldsProps) {
	return (
		<div className="space-y-4">
			<div className="space-y-1">
				<Label className="font-medium text-sm">Контактные данные</Label>
				{showLoginHint ? (
					<p className="text-muted-foreground text-xs">
						Есть аккаунт?{" "}
						<Link
							className="text-muted-foreground transition-colors hover:text-primary"
							href="/auth/sign-in"
						>
							Войдите, чтобы заполнить автоматически
						</Link>
						.
					</p>
				) : null}
			</div>
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
							placeholder="fordsevas@yandex.ru"
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
	);
}

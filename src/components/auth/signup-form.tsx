"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUpAction } from "@/lib/actions/authAction";

import {
	type SignUpSchema,
	zSignUpSchema,
} from "@/lib/schemas/forms/authSchema";
import { cn } from "@/lib/utils";

export function SignupForm({
	className,
	...props
}: React.ComponentProps<typeof Card> & { className?: string }) {
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		React.useState<boolean>(false);

	const form = useForm<SignUpSchema>({
		resolver: zodResolver(zSignUpSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			confirm_password: "",
		},
		mode: "onBlur",
		reValidateMode: "onChange",
	});

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = form;

	const onSubmit = async (values: SignUpSchema): Promise<void> => {
		clearErrors("root");

		try {
			await signUpAction(
				values.email,
				values.password,
				values.first_name,
				values.last_name,
			);
		} catch (err: unknown) {
			const message =
				err instanceof Error
					? err.message
					: "Не удалось создать аккаунт. Попробуйте ещё раз.";

			setError("root", { type: "server", message });
		}
	};

	return (
		<Card className={cn(className)} {...props}>
			<CardHeader>
				<CardTitle>Создать аккаунт</CardTitle>
				<CardDescription>
					Введите данные ниже, чтобы создать аккаунт
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<FieldGroup>
						{/* Имя + Фамилия */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<Field>
								<FieldLabel htmlFor="first_name">Имя</FieldLabel>
								<Input
									id="first_name"
									type="text"
									autoComplete="given-name"
									placeholder="Иван"
									aria-invalid={Boolean(errors.first_name)}
									{...register("first_name")}
									className={cn(
										errors.first_name &&
											"border-destructive focus-visible:ring-destructive",
									)}
								/>
								{errors.first_name?.message && (
									<FieldDescription className="text-destructive">
										{errors.first_name.message}
									</FieldDescription>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor="last_name">Фамилия</FieldLabel>
								<Input
									id="last_name"
									type="text"
									autoComplete="family-name"
									placeholder="Иванов"
									aria-invalid={Boolean(errors.last_name)}
									{...register("last_name")}
									className={cn(
										errors.last_name &&
											"border-destructive focus-visible:ring-destructive",
									)}
								/>
								{errors.last_name?.message && (
									<FieldDescription className="text-destructive">
										{errors.last_name.message}
									</FieldDescription>
								)}
							</Field>
						</div>

						{/* Email */}
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								id="email"
								type="email"
								autoComplete="email"
								placeholder="m@example.com"
								aria-invalid={Boolean(errors.email)}
								{...register("email")}
								className={cn(
									errors.email &&
										"border-destructive focus-visible:ring-destructive",
								)}
							/>
							{errors.email?.message ? (
								<FieldDescription className="text-destructive">
									{errors.email.message}
								</FieldDescription>
							) : (
								<FieldDescription>
									Мы не передаём ваш email третьим лицам.
								</FieldDescription>
							)}
						</Field>

						{/* Пароль */}
						<Field>
							<FieldLabel htmlFor="password">Пароль</FieldLabel>

							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									autoComplete="new-password"
									aria-invalid={Boolean(errors.password)}
									{...register("password")}
									className={cn(
										"pr-10",
										errors.password &&
											"border-destructive focus-visible:ring-destructive",
									)}
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="-translate-y-1/2 absolute top-1/2 right-1"
									onClick={() => setShowPassword((v) => !v)}
									aria-label={
										showPassword ? "Скрыть пароль" : "Показать пароль"
									}
								>
									{showPassword ? (
										<EyeOff className="size-4" />
									) : (
										<Eye className="size-4" />
									)}
								</Button>
							</div>

							{errors.password?.message ? (
								<FieldDescription className="text-destructive">
									{errors.password.message}
								</FieldDescription>
							) : (
								<FieldDescription>Минимум 8 символов.</FieldDescription>
							)}
						</Field>

						{/* Подтверждение пароля */}
						<Field>
							<FieldLabel htmlFor="confirm_password">
								Подтверждение пароля
							</FieldLabel>

							<div className="relative">
								<Input
									id="confirm_password"
									type={showConfirmPassword ? "text" : "password"}
									autoComplete="new-password"
									aria-invalid={Boolean(errors.confirm_password)}
									{...register("confirm_password")}
									className={cn(
										"pr-10",
										errors.confirm_password &&
											"border-destructive focus-visible:ring-destructive",
									)}
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="-translate-y-1/2 absolute top-1/2 right-1"
									onClick={() => setShowConfirmPassword((v) => !v)}
									aria-label={
										showConfirmPassword ? "Скрыть пароль" : "Показать пароль"
									}
								>
									{showConfirmPassword ? (
										<EyeOff className="size-4" />
									) : (
										<Eye className="size-4" />
									)}
								</Button>
							</div>

							{errors.confirm_password?.message ? (
								<FieldDescription className="text-destructive">
									{errors.confirm_password.message}
								</FieldDescription>
							) : (
								<FieldDescription>Повторите пароль ещё раз.</FieldDescription>
							)}
						</Field>

						{/* Ошибка сервера */}
						{errors.root?.message && (
							<FieldDescription className="text-center text-destructive">
								{errors.root.message}
							</FieldDescription>
						)}

						<Field>
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? "Создаём аккаунт..." : "Создать аккаунт"}
							</Button>

							<FieldDescription className="px-6 text-center">
								Уже есть аккаунт?{" "}
								<a
									href="/auth/sign-in"
									className="underline underline-offset-4"
								>
									Войти
								</a>
							</FieldDescription>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}

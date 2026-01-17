"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
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
import { LoadingButton } from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth-client";
import {
	type SignInSchema,
	zSignInSchema,
} from "@/lib/schemas/forms/authSchema";
import { cn } from "@/lib/utils";

type LoginFormProps = React.ComponentProps<"div"> & {
	showHeader?: boolean;
	showFooter?: boolean;
};

export function LoginForm({
	className,
	showHeader = true,
	showFooter = true,
	...props
}: LoginFormProps) {
	const form = useForm<SignInSchema>({
		resolver: zodResolver(zSignInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onSubmit",
	});

	const onSubmit = async (values: SignInSchema): Promise<void> => {
		form.clearErrors("root");

		const res = await authClient.signIn.email({
			email: values.email,
			password: values.password,
			callbackURL: "/",
		});
		if (res.error) {
			form.setError("root", {
				type: "server",
				message: "Не удалось войти. Попробуйте ещё раз.",
			});
			return;
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = form;

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				{showHeader && (
					<CardHeader>
						<CardTitle>Вход в аккаунт</CardTitle>
						<CardDescription>
							Введите email ниже, чтобы войти в аккаунт
						</CardDescription>
					</CardHeader>
				)}

				<CardContent>
					<FormProvider {...form}>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor="email">Email</FieldLabel>

									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										autoComplete="email"
										aria-invalid={Boolean(errors.email)}
										{...register("email")}
										className={cn(
											errors.email &&
												"border-destructive focus-visible:ring-destructive",
										)}
									/>

									{errors.email?.message && (
										<FieldDescription className="text-destructive">
											{errors.email.message}
										</FieldDescription>
									)}
								</Field>

								<Field>
									<div className="flex items-center">
										<FieldLabel htmlFor="password">Пароль</FieldLabel>
										<a
											href="/auth/forgot-password"
											className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
										>
											Забыли пароль?
										</a>
									</div>

									<Input
										id="password"
										type="password"
										autoComplete="current-password"
										aria-invalid={Boolean(errors.password)}
										{...register("password")}
										className={cn(
											errors.password &&
												"border-destructive focus-visible:ring-destructive",
										)}
									/>

									{errors.password?.message && (
										<FieldDescription className="text-destructive">
											{errors.password.message}
										</FieldDescription>
									)}
								</Field>

								{errors.root?.message && (
									<FieldDescription className="text-center text-destructive">
										{errors.root.message}
									</FieldDescription>
								)}

								<Field>
									<LoadingButton
										type="submit"
										className="w-full"
										isLoading={isSubmitting}
									>
										Войти
									</LoadingButton>

									{showFooter && (
										<FieldDescription className="text-center">
											Нет аккаунта?{" "}
											<a
												href="/auth/sign-up"
												className="underline underline-offset-4"
											>
												Зарегистрироваться
											</a>
										</FieldDescription>
									)}
								</Field>
							</FieldGroup>
						</form>
					</FormProvider>
				</CardContent>
			</Card>
		</div>
	);
}

import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpAction } from "@/lib/actions/auth";
import { auth } from "@/lib/auth";

export default async function SignUpPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (session) {
		redirect("/");
	}

	return (
		<main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
			<div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm">
				<div className="mb-6 space-y-1">
					<h1 className="font-semibold text-2xl">Регистрация</h1>
					<p className="text-muted-foreground text-sm">
						Введите данные, чтобы создать аккаунт.
					</p>
				</div>

				<form action={signUpAction} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="first_name">Имя</Label>
						<Input
							id="first_name"
							name="first_name"
							autoComplete="given-name"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="last_name">Фамилия</Label>
						<Input
							id="last_name"
							name="last_name"
							autoComplete="family-name"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Электронная почта</Label>
						<Input
							id="email"
							type="email"
							name="email"
							autoComplete="email"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Пароль</Label>
						<Input
							id="password"
							type="password"
							name="password"
							autoComplete="new-password"
							required
						/>
					</div>

					<Button type="submit" className="w-full">
						Зарегистрироваться
					</Button>
				</form>

				{/* 🔽 Новый блок: ссылка на вход */}
				<div className="mt-6 text-center text-muted-foreground text-sm">
					Уже есть аккаунт?{" "}
					<Link
						href="/auth/sign-in"
						className="font-medium text-primary hover:underline"
					>
						Войти
					</Link>
				</div>
			</div>
		</main>
	);
}

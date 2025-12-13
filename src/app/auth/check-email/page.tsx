import { ArrowLeft, MailCheck, RefreshCcw } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AnimatedMail } from "@/components/auth/animated-mail";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";

type Props = {
	searchParams: Promise<{ email?: string }>;
};

export default async function CheckEmailPage({ searchParams }: Props) {
	const { email } = await searchParams;

	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (session) {
		redirect("/");
	}

	return (
		<div className="mx-auto flex w-full max-w-md flex-col gap-6">
			<Card>
				<CardHeader>
					<div className="flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-full border">
							<MailCheck className="size-5" />
						</div>
						<div>
							<CardTitle>Подтвердите email</CardTitle>
							<CardDescription>
								Мы отправили письмо с подтверждением.
							</CardDescription>
						</div>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					<AnimatedMail className="py-2" />
					<div className="rounded-lg border p-3 text-sm">
						{email ? (
							<p>
								Письмо отправлено на:{" "}
								<span className="font-medium">{email}</span>
							</p>
						) : (
							<p>Письмо отправлено на ваш email.</p>
						)}
						<p className="mt-1 text-muted-foreground">
							Если письма нет — проверьте “Спам”.
						</p>
					</div>

					<div className="grid gap-2">
						{/* Вариант 1: "отправить ещё раз" (если у тебя есть resend action) */}
						<Button type="button" variant="secondary" className="w-full">
							<RefreshCcw className="mr-2 size-4" />
							Отправить письмо ещё раз
						</Button>

						<Button asChild variant="ghost" className="w-full">
							<Link href="/auth/sign-up">
								<ArrowLeft className="mr-2 size-4" />
								Изменить email
							</Link>
						</Button>
					</div>

					<p className="text-muted-foreground text-xs">
						Если письмо не приходит в течение 3 минут — попробуйте отправить ещё
						раз или указать другой адрес.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

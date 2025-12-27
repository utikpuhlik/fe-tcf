import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutSuccessPage() {
	return (
		<main className="min-h-screen bg-neutral-50 px-6 py-12 text-neutral-900">
			<div className="mx-auto flex w-full max-w-2xl flex-col items-center">
				<Card className="w-full">
					<CardContent className="flex flex-col items-center gap-4 py-12 text-center">
						<div className="flex size-16 items-center justify-center rounded-full bg-emerald-50">
							<CheckCircle2 className="size-9 text-emerald-600" />
						</div>
						<div className="space-y-2">
							<h1 className="font-semibold text-2xl">Ваш заказ принят</h1>
							<p className="text-neutral-600">
								Мы отправили информацию о заказе на вашу почту.
							</p>
							<p className="text-neutral-600">
								Наши менеджеры скоро свяжутся с вами.
							</p>
						</div>
						<div className="flex flex-wrap justify-center gap-3">
							<Button asChild>
								<Link href="/">Вернуться на главную</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href="/catalog/ford">Продолжить покупки</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}

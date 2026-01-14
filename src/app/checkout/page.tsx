import { headers } from "next/headers";
import Link from "next/link";
import { CartSummary } from "@/components/cart/cart-summary";
import { CheckoutCartReconciler } from "@/components/checkout/checkout-cart-reconciler";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutLoginDialog } from "@/components/checkout/checkout-login-dialog";
import { auth } from "@/lib/auth";

export default async function CheckoutPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const autofill = session
		? {
				firstName: session.user.first_name,
				lastName: session.user.last_name,
				email: session.user.email,
			}
		: undefined;
	const showLoginHint = !session;
	const userId = session?.user?.id ?? null;

	return (
		<main className="min-h-screen text-neutral-900">
			<CheckoutCartReconciler />
			<CheckoutLoginDialog open={showLoginHint} />
			<div className="mx-auto w-full max-w-6xl">
				<header className="mb-6 space-y-1">
					<h1 className="font-semibold text-xl sm:text-2xl">
						Адрес и контактные данные
					</h1>
					{showLoginHint ? (
						<p className="text-neutral-600 text-sm">
							<Link
								className="text-neutral-600 underline underline-offset-4 transition-colors hover:text-primary"
								href="/auth/sign-in"
							>
								Войдите, чтобы заполнить автоматически
							</Link>
						</p>
					) : null}
				</header>

				<div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_380px]">
					{/* LEFT */}
					<CheckoutForm autofill={autofill} userId={userId} />

					{/* RIGHT */}
					<div className="lg:sticky lg:top-8">
						<CartSummary />
					</div>
				</div>
			</div>
		</main>
	);
}

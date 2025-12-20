import { CartSummary } from "@/components/cart/cart-summary";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export default function CheckoutPage() {
	return (
		<main className="min-h-screen bg-neutral-50 px-6 py-12 text-neutral-900">
			<div className="mx-auto w-full max-w-6xl">
				<header className="mb-6 space-y-1">
					<h1 className="font-semibold text-2xl">Адрес и контактные данные</h1>
					<p className="text-neutral-600 text-sm">
						Подсказки адресов приходят из Yandex Geocoder через наш API
						(`/api/geocode`).
					</p>
				</header>

				<div className="grid gap-6 lg:grid-cols-[1fr_380px]">
					{/* LEFT */}
					<CheckoutForm />

					{/* RIGHT */}
					<div className="lg:sticky lg:top-8">
						<CartSummary />
					</div>
				</div>
			</div>
		</main>
	);
}

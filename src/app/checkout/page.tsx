import { CheckoutForm } from "@/components/checkout/checkout-form";

export default function CheckoutPage() {
	return (
		<main className="min-h-screen bg-neutral-50 px-6 py-12 text-neutral-900">
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
				<header className="space-y-1">
					<p className="font-medium text-neutral-500 text-sm">Checkout</p>
					<h1 className="font-semibold text-2xl">Адрес и контактные данные</h1>
					<p className="text-neutral-600 text-sm">
						Подсказки адресов приходят из Yandex Geocoder через наш API
						(`/api/geocode`).
					</p>
				</header>

				<CheckoutForm />
			</div>
		</main>
	);
}

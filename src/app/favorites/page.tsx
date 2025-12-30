import { authGateWithRedirect } from "@/lib/utils/authGate";

export default async function FavoritesPage() {
	await authGateWithRedirect();

	return (
		<main>
			<h1 className="font-semibold text-xl tracking-tight lg:text-2xl">
				Избранное
			</h1>
		</main>
	);
}

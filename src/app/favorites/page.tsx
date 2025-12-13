import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function FavoritesPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		unauthorized();
	}

	return (
		<main>
			<h1 className="font-semibold text-xl tracking-tight lg:text-2xl">
				Избранное
			</h1>
		</main>
	);
}

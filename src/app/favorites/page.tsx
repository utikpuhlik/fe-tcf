import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function FavoritesPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		redirect("/auth/sign-in");
	}

	return (
		<main>
			<h1 className="text-xl font-semibold tracking-tight lg:text-2xl">
				Избранное
			</h1>
		</main>
	);
}

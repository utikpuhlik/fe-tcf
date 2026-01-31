import type { Metadata } from "next";
import { usersApi } from "@/lib/api/userApi";
import { generateMeta } from "@/lib/utils";
import { authGateWithRedirect } from "@/lib/utils/authGate";

export async function generateMetadata(): Promise<Metadata> {
	return generateMeta({
		title: "Профиль",
		description: "Профиль пользователя",
		canonical: "/profile",
	});
}

export default async function ProfilePage() {
	const session = await authGateWithRedirect();

	const user = await usersApi.fetchById(session.user.id);

	return (
		<main>
			<h1 className="font-semibold text-xl tracking-tight sm:text-2xl lg:text-3xl">
				{`Профиль ${user.first_name} ${user.last_name}`}
			</h1>
		</main>
	);
}

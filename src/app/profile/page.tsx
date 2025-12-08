import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { usersApi } from "@/lib/api/userApi";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		unauthorized();
	}

	const user = await usersApi.fetchById(session.user.id);

	return (
		<main>
			<h1 className="font-semibold text-xl tracking-tight lg:text-2xl">
				{`Профиль ${user.first_name} ${user.last_name}`}
			</h1>
		</main>
	);
}

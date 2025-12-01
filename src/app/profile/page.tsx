import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		unauthorized();
	}

	return (
		<main>
			<h1 className="text-xl font-semibold tracking-tight lg:text-2xl">
				{`Профиль ${session.user.email}`}
			</h1>
		</main>
	);
}

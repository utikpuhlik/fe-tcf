import { usersApi } from "@/lib/api/userApi";
import { authGateWithRedirect } from "@/lib/utils/authGate";

export default async function ProfilePage() {
	const session = await authGateWithRedirect();

	const user = await usersApi.fetchById(session.user.id);

	return (
		<main>
			<h1 className="font-semibold text-xl tracking-tight lg:text-2xl">
				{`Профиль ${user.first_name} ${user.last_name}`}
			</h1>
		</main>
	);
}

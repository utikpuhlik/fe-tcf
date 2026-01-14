import { AuthView } from "@daveyplate/better-auth-ui";
import { authViewPaths } from "@daveyplate/better-auth-ui/server";

export const dynamicParams = false;

export function generateStaticParams() {
	return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({
	params,
}: {
	params: Promise<{ path: string }>;
}) {
	const { path } = await params;

	return (
		<main className="mx-auto flex w-full max-w-2xl grow flex-col items-center justify-center self-center">
			<AuthView path={path} />
		</main>
	);
}
